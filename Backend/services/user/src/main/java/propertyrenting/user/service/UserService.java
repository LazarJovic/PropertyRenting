package propertyrenting.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.model.Admin;
import propertyrenting.user.model.Role;
import propertyrenting.user.model.User;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import propertyrenting.user.repository.UserRepository;
import proto.user.UserServiceGrpc;

import java.util.ArrayList;
import java.util.HashSet;

@GrpcService
public class UserService extends UserServiceGrpc.UserServiceImplBase {

    private UserRepository userRepository;

    private RoleService roleService;

    private CustomUserDetailsService userDetailsService;

    @Autowired
    public UserService(UserRepository userRepository, RoleService roleService, CustomUserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
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

}
