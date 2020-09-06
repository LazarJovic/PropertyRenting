package propertyrenting.ad.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "client")
@NoArgsConstructor
@Getter
public class Client implements UserDetails {

    @Id
    private Long id;

    @Setter
    @Column
    private String firstName;

    @Setter
    @Column
    private String surname;

    @Setter
    @Column
    private String email;

    @Setter
    @Column
    private boolean isTenant;

    @OneToMany(mappedBy = "landlord", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<PropertyInfo> ownedPropertySet;

    @ManyToMany
    @JoinTable(name = "tenant_favourites", joinColumns = @JoinColumn(name = "tenant_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ad_id", referencedColumnName = "id"))
    private Set<Ad> favouriteAdSet;

    public Client(Long id, String firstName, String surname, String email, boolean isTenant) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.isTenant = isTenant;
        this.ownedPropertySet = new HashSet<>();
        this.favouriteAdSet = new HashSet<>();
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
