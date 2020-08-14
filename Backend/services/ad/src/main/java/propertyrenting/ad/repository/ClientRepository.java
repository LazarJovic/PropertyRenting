package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.ad.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
