package propertyrenting.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.booking.model.BookingRequest;

import java.util.List;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long> {

    @Query(value = "select * from booking_request r, booking_ad a where r.booking_ad = a.id and a.property_id = ?1" +
            "and r.booking_request_status in ('RESERVED','PAID')", nativeQuery = true)
    List<BookingRequest> isPropertyAvailable(Long propertyId);

}
