package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.property.model.Landlord;

public interface LandlordRepository extends JpaRepository<Landlord, Long> {
}
