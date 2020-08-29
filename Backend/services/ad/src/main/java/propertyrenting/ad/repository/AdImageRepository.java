package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.ad.model.AdImage;

import java.util.List;

public interface AdImageRepository extends JpaRepository<AdImage, Long> {

    @Query(value = "select * from ad_image a where a.ad = ?1", nativeQuery = true)
    List<AdImage> findByAdId(Long id);

}
