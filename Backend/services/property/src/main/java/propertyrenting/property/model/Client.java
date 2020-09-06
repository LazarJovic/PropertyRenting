package propertyrenting.property.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "client")
@NoArgsConstructor
@Getter
@Setter
public class Client implements UserDetails {

    @Id
    private Long id;

    @Column
    private String firstName;

    @Column
    private String surname;

    @Column
    private String email;

    @OneToMany(mappedBy = "landlord", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Property> propertySet;

    public Client(Long id, String firstName, String surname, String email) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
