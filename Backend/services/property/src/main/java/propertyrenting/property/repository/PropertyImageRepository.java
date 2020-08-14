package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.property.model.PropertyImage;

public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {
}
