package propertyrenting.property.config;

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
import propertyrenting.property.service.CustomUserDetailsService;
import proto.auth.AuthServiceGrpc;
import proto.property.PropertyServiceGrpc;
import proto.propertyType.PropertyTypeServiceGrpc;
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

        source.set(UserServiceGrpc.METHOD_CREATE_CLIENT, AccessPredicate.permitAll());

        source.set(PropertyTypeServiceGrpc.METHOD_GET_ALL_PROPERTY_TYPES, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_TYPE_OVERVIEW")));
        source.set(PropertyTypeServiceGrpc.METHOD_CREATE_PROPERTY_TYPE, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_TYPE_CREATE")));

        source.set(PropertyServiceGrpc.METHOD_REGISTER_PROPERTY, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_REGISTER")));
        source.set(PropertyServiceGrpc.METHOD_DELETE_PROPERTY, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_DELETE")));
        source.set(PropertyServiceGrpc.METHOD_GET_MY_PROPERTIES, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("MY_PROPERTY_OVERVIEW")));
        source.set(PropertyServiceGrpc.METHOD_UPDATE_RATING_PROPERTY, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_RATING_UPDATE")));
        source.set(PropertyServiceGrpc.METHOD_GET_BY_AVERAGE_RATING, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_GET_BY_RATING")));
        source.set(PropertyServiceGrpc.METHOD_GET_BY_NUMBER_OF_BOOKINGS, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("PROPERTY_GET_BY_BOOKINGS")));

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
