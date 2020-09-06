package propertyrenting.communication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import propertyrenting.communication.model.Client;
import propertyrenting.communication.repository.ClientRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private ClientRepository clientRepository;

    private BCryptPasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    @Autowired
    public CustomUserDetailsService(ClientRepository clientRepository, AuthenticationManager authenticationManager) {
        this.clientRepository = clientRepository;
        this.authenticationManager = authenticationManager;
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Client client = this.clientRepository.findByEmail(email);
        if (client == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return client;
        }
    }

    public boolean emailTaken(String email) {
        Client client = clientRepository.findByEmail(email);

        return client != null;
    }

    public String encodePassword(String password) {
        return this.passwordEncoder.encode(password);
    }

}
