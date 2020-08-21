package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import propertyrenting.user.enumeration.RoleType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "role")
@NoArgsConstructor
@Getter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "role_type")
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Setter
    @ManyToMany
    @JoinTable(name = "role_permission", joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id"))
    private Set<Permission> permissionSet;

    @ManyToMany(mappedBy = "roleSet")
    private Set<User> userSet;

    public Role(RoleType roleType) {
        this.roleType = roleType;
    }
}
