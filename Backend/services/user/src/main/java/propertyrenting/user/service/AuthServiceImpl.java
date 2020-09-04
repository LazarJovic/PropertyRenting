package propertyrenting.user.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.model.Client;
import propertyrenting.user.model.Landlord;
import propertyrenting.user.security.TokenUtils;
import proto.auth.AuthServiceGrpc;
import proto.auth.LoginMessage;
import proto.auth.UserWithTokenMessage;

import propertyrenting.user.model.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@GrpcService
public class AuthServiceImpl extends AuthServiceGrpc.AuthServiceImplBase {

    private AuthenticationManager authenticationManager;

    private TokenUtils tokenUtils;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager, TokenUtils tokenUtils) {
        this.authenticationManager = authenticationManager;
        this.tokenUtils = tokenUtils;
    }

    public void login(LoginMessage request, StreamObserver<UserWithTokenMessage> responseObserver) {

        UserWithTokenMessage response;
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(), request.getPassword()));
        } catch (BadCredentialsException e) {
            response = UserWithTokenMessage.newBuilder()
                    .setReturnMessage("Bad credentials")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        if (authentication != null) {
            User user = (User) authentication.getPrincipal();

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
            List<String> permissions = this.getPermissions(authorities);
            RoleType roleType = user.getRoleSet().iterator().next().getRoleType();
            String jwt = tokenUtils.generateToken(user.getUsername(), permissions, roleType.toString());
            int expiresIn = tokenUtils.getExpiredIn();

            response = UserWithTokenMessage.newBuilder()
                    .setAccessToken(jwt)
                    .setExpiresIn(expiresIn)
                    .setUserId(user.getId())
                    .setRole(roleType.toString())
                    .setValid(true)
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    private List<String> getPermissions(Collection<? extends GrantedAuthority> authorities) {
        List<String> permissions = new ArrayList<>();
        for(GrantedAuthority p: authorities) {
            permissions.add(p.getAuthority());
        }
        return permissions;
    }

}
