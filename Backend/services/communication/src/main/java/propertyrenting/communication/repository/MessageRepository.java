package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.communication.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
