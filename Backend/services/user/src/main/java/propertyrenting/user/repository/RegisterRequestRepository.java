package propertyrenting.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.user.model.RegisterRequest;

public interface RegisterRequestRepository extends JpaRepository<RegisterRequest, Long> {
}
