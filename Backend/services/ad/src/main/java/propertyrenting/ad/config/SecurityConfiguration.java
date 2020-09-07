package propertyrenting.ad.config;

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
import propertyrenting.ad.service.CustomUserDetailsService;
import proto.ad.AdServiceGrpc;
import proto.property.PropertyServiceGrpc;
import proto.propertyInfo.PropertyInfoServiceGrpc;
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

        source.set(AdServiceGrpc.METHOD_CREATE_AD, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("AD_CREATE")));
        source.set(AdServiceGrpc.METHOD_DELETE_AD, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("AD_DELETE")));
        source.set(AdServiceGrpc.METHOD_CHECK_DELETE_PROPERTY, AccessPredicate.permitAll());
        source.set(AdServiceGrpc.METHOD_SEARCH_ADS, AccessPredicate.permitAll());
        source.set(AdServiceGrpc.METHOD_GET_AD_DETAILS, AccessPredicate.permitAll());
        source.set(AdServiceGrpc.METHOD_GET_AD_IMAGES, AccessPredicate.permitAll());
        source.set(AdServiceGrpc.METHOD_GET_MY_ACTIVE_ADS, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("AD_GET_ACTIVE")));
        source.set(AdServiceGrpc.METHOD_GET_MY_INACTIVE_ADS, AccessPredicate.hasAuthority(
                new SimpleGrantedAuthority("AD_GET_INACTIVE")));

        source.set(PropertyInfoServiceGrpc.METHOD_CREATE_PROPERTY_INFO, AccessPredicate.permitAll());
        source.set(PropertyInfoServiceGrpc.METHOD_UPDATE_RATING_PROPERTY_INFO, AccessPredicate.permitAll());


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
