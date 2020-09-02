package propertyrenting.communication.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import propertyrenting.communication.enumeration.CommentStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@NoArgsConstructor
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column
    private String content;

    @Setter
    @Column
    private LocalDateTime timestamp;

    @Setter
    @Column
    @Enumerated(EnumType.STRING)
    private CommentStatus status;

    @Setter
    @Column
    private boolean isTenantSender;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking", referencedColumnName = "id")
    private Booking booking;

    public Comment(String content, LocalDateTime timestamp, CommentStatus status, boolean isTenantSender) {
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
        this.isTenantSender = isTenantSender;
    }
}
