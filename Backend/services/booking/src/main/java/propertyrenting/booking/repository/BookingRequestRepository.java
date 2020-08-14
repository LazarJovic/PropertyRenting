package propertyrenting.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.booking.model.BookingRequest;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long> {
}
