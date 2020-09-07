package propertyrenting.booking.config;

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
import propertyrenting.booking.service.CustomUserDetailsService;
import proto.bookingAd.BookingAdServiceGrpc;
import proto.bookingRequest.BookingRequestServiceGrpc;
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

        source.set(BookingAdServiceGrpc.METHOD_CREATE_BOOKING_AD, AccessPredicate.permitAll());

        source.set(BookingRequestServiceGrpc.METHOD_CHECK_AVAILABILITY, AccessPredicate.permitAll());
        source.set(BookingRequestServiceGrpc.METHOD_CREATE_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_CREATE")));
        source.set(BookingRequestServiceGrpc.METHOD_ACCEPT_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_ACCEPT")));
        source.set(BookingRequestServiceGrpc.METHOD_CANCEL_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_CANCEL")));
        source.set(BookingRequestServiceGrpc.METHOD_DENY_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_DENY")));
        source.set(BookingRequestServiceGrpc.METHOD_FINISH_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_FINISH")));
        source.set(BookingRequestServiceGrpc.METHOD_PAY_BOOKING_REQUEST, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_PAY")));
        source.set(BookingRequestServiceGrpc.METHOD_CHECK_DELETE_AD, AccessPredicate.permitAll());
        source.set(BookingRequestServiceGrpc.METHOD_GET_MOST_RENTED_PROPERTIES, AccessPredicate.permitAll());
        source.set(BookingRequestServiceGrpc.METHOD_GET_REQUESTS_BY_STATUS_LANDLORD, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_GET_BY_STATUS")));
        source.set(BookingRequestServiceGrpc.METHOD_GET_REQUESTS_BY_STATUS_TENANT, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("BOOKING_REQUEST_GET_BY_STATUS")));

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
