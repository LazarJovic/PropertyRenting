package propertyrenting.user.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.model.Admin;
import propertyrenting.user.model.Role;
import propertyrenting.user.model.User;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import propertyrenting.user.repository.UserRepository;
import proto.propertyType.EmptyMessage;
import proto.user.CreateClientMessage;
import proto.user.UserServiceGrpc;

import java.util.ArrayList;
import java.util.HashSet;

@GrpcService
public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    private UserRepository userRepository;

    private RoleService roleService;

    private CustomUserDetailsService userDetailsService;

    @GrpcClient("property-server")
    private UserServiceGrpc.UserServiceStub userServiceStubProperty;

//    @GrpcClient("ad-server")
//    private UserServiceGrpc.UserServiceStub userServiceStubAd;
//
//    @GrpcClient("booking-server")
//    private UserServiceGrpc.UserServiceStub userServiceStubBooking;
//
//    @GrpcClient("communication-server")
//    private UserServiceGrpc.UserServiceStub userServiceStubCommunication;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
    }

    public void createUser(CreateClientMessage createClientMessage) {
        if(createClientMessage.getIsLandlord()) {
            this.userServiceStubProperty.createClient(createClientMessage, this.getStreamObserver());
        }

        //this.userServiceStubAd.createClient(createClientMessage, this.getStreamObserver());
        //this.userServiceStubBooking.createClient(createClientMessage, this.getStreamObserver());
        //this.userServiceStubCommunication.createClient(createClientMessage, this.getStreamObserver());

    }

    @EventListener(ApplicationReadyEvent.class)
    public void createAdmin() {

        this.roleService.initRoles();

        if(this.userRepository.findAll().size() != 0) {
            return;
        }

        User admin = new Admin("Admir", "Admirovic", "admin@maildrop.cc", "2342343",
                "123123123");
        admin.setPassword(this.userDetailsService.encodePassword(admin.getPassword()));
        admin.setRoleSet(this.roleService.findByType(RoleType.ROLE_ADMIN));
        //user.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));

        this.userRepository.save(admin);
    }

    private StreamObserver<EmptyMessage> getStreamObserver() {
        return new StreamObserver<>() {
            @Override
            public void onNext(EmptyMessage emptyMessage) {
            }

            @Override
            public void onError(Throwable throwable) {
            }

            @Override
            public void onCompleted() {
            }
        };
    }

}
