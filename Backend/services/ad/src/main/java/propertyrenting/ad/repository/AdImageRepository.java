package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.ad.model.AdImage;

public interface AdImageRepository extends JpaRepository<AdImage, Long> {
}
