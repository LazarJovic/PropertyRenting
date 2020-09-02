package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.communication.model.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query(value = "select * from message m where m.booking = ?1 order by m.timestamp desc", nativeQuery = true)
    List<Message> findByBookingIdSortedByDate(Long bookingId);

}
