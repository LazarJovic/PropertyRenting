package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.ad.model.PropertyInfo;

public interface PropertyInfoRepository extends JpaRepository<PropertyInfo, Long> {
}
