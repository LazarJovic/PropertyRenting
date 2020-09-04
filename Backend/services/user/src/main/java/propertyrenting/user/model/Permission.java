package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import propertyrenting.user.enumeration.PermissionType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "permission")
@NoArgsConstructor
@Getter
public class Permission implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permission_type")
    @Enumerated(EnumType.STRING)
    private PermissionType permissionType;

    @ManyToMany(mappedBy = "permissionSet")
    private Set<Role> roles;

    public Permission(PermissionType permissionType) {
        this.permissionType = permissionType;
    }

    @Override
    public String getAuthority() {
        return this.permissionType.toString();
    }
}
