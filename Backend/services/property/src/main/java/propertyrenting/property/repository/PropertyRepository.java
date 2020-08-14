package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.property.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
