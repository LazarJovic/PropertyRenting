package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.communication.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
