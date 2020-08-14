package propertyrenting.user.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import propertyrenting.user.enumeration.PermissionType;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "permission")
@NoArgsConstructor
@Getter
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permission_type")
    @Enumerated(EnumType.STRING)
    private PermissionType permissionType;

    @ManyToMany(mappedBy = "permissionSet")
    private Set<Role> roles;

}
