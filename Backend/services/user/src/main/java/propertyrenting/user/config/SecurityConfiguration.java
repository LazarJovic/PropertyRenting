package propertyrenting.user.config;

import net.devh.boot.grpc.server.security.authentication.BasicGrpcAuthenticationReader;
import net.devh.boot.grpc.server.security.authentication.GrpcAuthenticationReader;
import net.devh.boot.grpc.server.security.check.AccessPredicate;
import net.devh.boot.grpc.server.security.check.AccessPredicateVoter;
import net.devh.boot.grpc.server.security.check.GrpcSecurityMetadataSource;
import net.devh.boot.grpc.server.security.check.ManualGrpcSecurityMetadataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import propertyrenting.user.service.CustomUserDetailsService;
import proto.auth.AuthServiceGrpc;
import proto.registerRequest.RegisterRequestServiceGrpc;
import proto.user.UserServiceGrpc;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService jwtUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public GrpcAuthenticationReader grpcAuthenticationReader() {
        return new BasicGrpcAuthenticationReader();
    }

    @Bean
    GrpcSecurityMetadataSource grpcSecurityMetadataSource() {
        final ManualGrpcSecurityMetadataSource source = new ManualGrpcSecurityMetadataSource();

        source.set(AuthServiceGrpc.METHOD_LOGIN, AccessPredicate.permitAll());

        source.set(RegisterRequestServiceGrpc.METHOD_CREATE_REGISTER_REQUEST, AccessPredicate.permitAll());
        source.set(RegisterRequestServiceGrpc.METHOD_VERIFY_EMAIL, AccessPredicate.permitAll());

        source.set(UserServiceGrpc.METHOD_CREATE_CLIENT, AccessPredicate.permitAll());
        source.set(UserServiceGrpc.METHOD_GET_USERS_BY_ROLE, AccessPredicate.hasAuthority(new SimpleGrantedAuthority("USER_OVERVIEW")));
        source.set(UserServiceGrpc.METHOD_BLOCK_USER, AccessPredicate.hasAuthority(new SimpleGrantedAuthority("USER_BLOCK")));
        source.set(UserServiceGrpc.METHOD_UNBLOCK_USER, AccessPredicate.hasAuthority(new SimpleGrantedAuthority("USER_UNBLOCK")));

        source.setDefault(AccessPredicate.denyAll());
        return source;
    }

    @Bean
    AccessDecisionManager accessDecisionManager() {
        final List<AccessDecisionVoter<?>> voters = new ArrayList<>();
        voters.add(new AccessPredicateVoter());
        return new UnanimousBased(voters);
    }

}
