package propertyrenting.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRoleType(RoleType roleType);

}
