package propertyrenting.communication.config;

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
import propertyrenting.communication.service.CustomUserDetailsService;
import proto.adRating.AdRatingServiceGrpc;
import proto.booking.BookingServiceGrpc;
import proto.comment.CommentServiceGrpc;
import proto.message.MessageServiceGrpc;
import proto.property.PropertyServiceGrpc;
import proto.propertyType.PropertyTypeServiceGrpc;
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

        source.set(AdRatingServiceGrpc.METHOD_RATE_AD, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("AD_RATE")));

        source.set(BookingServiceGrpc.METHOD_CREATE_BOOKING, AccessPredicate.permitAll());

        source.set(CommentServiceGrpc.METHOD_CREATE_COMMENT, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("COMMENT_CREATE")));
        source.set(CommentServiceGrpc.METHOD_ACCEPT_COMMENT, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("COMMENT_ACCEPT")));
        source.set(CommentServiceGrpc.METHOD_DENY_COMMENT, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("COMMENT_DENY")));
        source.set(CommentServiceGrpc.METHOD_GET_ALL_PENDING_COMMENTS, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("COMMENT_GET_PENDING")));
        source.set(CommentServiceGrpc.METHOD_GET_ALL_PROPERTY_COMMENTS, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("COMMENT_GET_ACCEPTED")));

        source.set(MessageServiceGrpc.METHOD_CREATE_MESSAGE, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("MESSAGE_CREATE")));
        source.set(MessageServiceGrpc.METHOD_GET_ALL_REQUEST_MESSAGES, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("MESSAGE_GET_BY_REQUEST")));

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
