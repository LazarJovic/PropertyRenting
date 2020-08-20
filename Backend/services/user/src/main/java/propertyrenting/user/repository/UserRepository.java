package propertyrenting.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
