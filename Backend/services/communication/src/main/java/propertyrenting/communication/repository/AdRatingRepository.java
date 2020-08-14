package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.communication.model.AdRating;

public interface AdRatingRepository extends JpaRepository<AdRating, Long> {
}
