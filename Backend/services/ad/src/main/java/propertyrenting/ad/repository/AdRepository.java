package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.ad.model.Ad;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {

    @Query(value = "select * from ad a where a.deleted = false", nativeQuery = true)
    List<Ad> findAllActive();

    @Query(value = "select * from ad a where a.property_info = ?1", nativeQuery = true)
    List<Ad> findByPropertyInfo(long propertyInfoId);

}
