package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.communication.model.AdRating;

public interface AdRatingRepository extends JpaRepository<AdRating, Long> {

    @Query(value = "select * from ad_rating ar, booking b where ar.booking = b.id and b.tenant = ?1 and b.ad_id = ?2 ", nativeQuery = true)
    AdRating isAdRatedByUser(Long userId, Long adId);

    @Query(value = "select avg(rating) from ad_rating ar, booking b where ar.booking = b.id and b.property_id = ?1", nativeQuery = true)
    double vehicleRatingAverage(Long propertyId);
}
