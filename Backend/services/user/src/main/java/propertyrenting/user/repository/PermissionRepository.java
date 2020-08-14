package propertyrenting.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.user.model.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
}
