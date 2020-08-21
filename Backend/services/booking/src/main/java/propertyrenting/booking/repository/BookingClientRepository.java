package propertyrenting.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.booking.model.BookingClient;

public interface BookingClientRepository extends JpaRepository<BookingClient, Long> {
}
