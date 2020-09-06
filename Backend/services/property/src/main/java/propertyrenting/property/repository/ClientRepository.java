package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.property.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Client findByEmail(String email);

}
