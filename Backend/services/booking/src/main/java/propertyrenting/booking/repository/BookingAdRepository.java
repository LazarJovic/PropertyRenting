package propertyrenting.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.booking.model.BookingAd;

public interface BookingAdRepository extends JpaRepository<BookingAd, Long> {
}
