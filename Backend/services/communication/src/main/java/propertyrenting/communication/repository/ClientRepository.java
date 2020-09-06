package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.communication.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Client findByEmail(String email);
}
