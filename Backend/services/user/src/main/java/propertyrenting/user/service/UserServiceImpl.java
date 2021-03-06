package propertyrenting.user.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.mapper.UserMapper;
import propertyrenting.user.model.Admin;
import propertyrenting.user.model.Client;
import propertyrenting.user.model.User;
import propertyrenting.user.repository.UserRepository;
import proto.propertyType.EmptyMessage;
import proto.user.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;

@GrpcService
public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    private UserRepository userRepository;

    private RoleService roleService;

    private CustomUserDetailsService userDetailsService;

    private UserMapper userMapper;

    @GrpcClient("property-server")
    private UserServiceGrpc.UserServiceBlockingStub userServiceStubProperty;

    @GrpcClient("ad-server")
    private UserServiceGrpc.UserServiceBlockingStub userServiceStubAd;

    @GrpcClient("booking-server")
    private UserServiceGrpc.UserServiceBlockingStub userServiceStubBooking;

    @GrpcClient("communication-server")
    private UserServiceGrpc.UserServiceBlockingStub userServiceStubCommunication;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleService roleService, CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
        this.userMapper = new UserMapper();
    }

    public void createUser(CreateClientMessage createClientMessage) {

        this.userServiceStubProperty.createClient(createClientMessage);
        this.userServiceStubAd.createClient(createClientMessage);
        this.userServiceStubBooking.createClient(createClientMessage);
        this.userServiceStubCommunication.createClient(createClientMessage);

    }

    public void getUsersByRole(GetByRoleMessage request, StreamObserver<UserMessage> responseObserver) {
        List<User> users = this.userRepository.findByType(request.getRole());

        users.forEach(user -> {
            UserMessage message = this.userMapper.toUserMessage((Client) user);
            responseObserver.onNext(message);
        });

        responseObserver.onCompleted();
    }

    public void blockUser(UserIdMessage request, StreamObserver<UserMessage> responseObserver) {
        Client client =  (Client) this.userRepository.findById(request.getId()).orElseGet(null);
        client.setAccountBlocked(true);
        responseObserver.onNext(this.userMapper.toUserMessage(this.userRepository.save(client)));
        responseObserver.onCompleted();
    }

    public void unblockUser(UserIdMessage request, StreamObserver<UserMessage> responseObserver) {
        Client client =  (Client) this.userRepository.findById(request.getId()).orElseGet(null);
        client.setAccountBlocked(false);
        responseObserver.onNext(this.userMapper.toUserMessage(this.userRepository.save(client)));
        responseObserver.onCompleted();
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
        admin.setLastPasswordResetDate(new Timestamp(System.currentTimeMillis()));

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
