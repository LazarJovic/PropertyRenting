package propertyrenting.ad.interceptor;

import io.grpc.*;
import net.devh.boot.grpc.server.interceptor.GrpcGlobalServerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import propertyrenting.ad.security.TokenUtils;
import propertyrenting.ad.security.auth.TokenBasedAuthentication;
import propertyrenting.ad.service.CustomUserDetailsService;

import java.util.Set;

import static com.google.common.base.Strings.nullToEmpty;

@GrpcGlobalServerInterceptor
@Order(10)
public class BasicAuthenticationInterceptor implements ServerInterceptor {

    private TokenUtils tokenUtils;

    private CustomUserDetailsService userDetailsService;

    @Autowired
    public BasicAuthenticationInterceptor(TokenUtils tokenUtils, CustomUserDetailsService userDetailsService) {
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> serverCall, Metadata metadata,
                                                                 ServerCallHandler<ReqT, RespT> serverCallHandler) {
        String authHeader = nullToEmpty(metadata.get(Metadata.Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER)));
        if (!authHeader.startsWith("Bearer ")) {
            return serverCallHandler.startCall(serverCall, metadata);
        }

        try {
              String accessToken = authHeader.substring(7);
              String username = tokenUtils.getUsernameFromToken(accessToken);
              if (username != null) {
                  UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                  Set<GrantedAuthority> authorities = tokenUtils.getAuthoritiesFromToken(accessToken);
                      if (tokenUtils.validateToken(accessToken)) {
                          TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails, authorities);
                          authentication.setToken(accessToken);
                          SecurityContextHolder.getContext().setAuthentication(authentication);
                      }
              }

        } catch (AuthenticationException e) {
            SecurityContextHolder.clearContext();

            throw Status.UNAUTHENTICATED.withDescription(e.getMessage()).withCause(e).asRuntimeException();
        }

        return serverCallHandler.startCall(serverCall, metadata);
    }
}
