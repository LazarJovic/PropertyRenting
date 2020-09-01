package propertyrenting.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.property.model.Property;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query(value = "select * from property p where p.deleted = false", nativeQuery = true)
    List<Property> findAllActive();

    @Query(value = "select * from property p where p.deleted = false order by average_rating DESC limit 5;", nativeQuery = true)
    List<Property> findTopFiveByRating();
}
