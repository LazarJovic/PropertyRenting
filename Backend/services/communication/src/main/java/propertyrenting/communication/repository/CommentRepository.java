package propertyrenting.communication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import propertyrenting.communication.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "select * from comment c where c.status='PENDING'", nativeQuery = true)
    List<Comment> findAllPending();

    @Query(value = "select * from comment c, booking b where c.booking = b.id and b.property_id = ?1" +
            " and c.status='ACCEPTED'", nativeQuery = true)
    List<Comment> findPropertyAccepted(long id);

    @Query(value = "select * from comment c, booking b where c.booking = b.id and b.tenant = ?1" +
            " and b.ad_id = ?2 and c.status='ACCEPTED' and c.is_tenant_sender = true", nativeQuery = true)
    List<Comment> findUsersCommentsForAd(Long tenantId, Long adId);
}
