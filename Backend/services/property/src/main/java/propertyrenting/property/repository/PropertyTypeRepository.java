package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.property.model.PropertyType;

public interface PropertyTypeRepository extends JpaRepository<PropertyType, Long> {

    PropertyType findByName(String name);

}
