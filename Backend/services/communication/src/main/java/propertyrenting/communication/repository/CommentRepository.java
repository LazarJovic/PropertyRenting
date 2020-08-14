package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import propertyrenting.communication.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
