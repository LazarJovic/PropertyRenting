package propertyrenting.ad.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.ad.model.Ad;

public interface AdRepository extends JpaRepository<Ad, Long> {
}
