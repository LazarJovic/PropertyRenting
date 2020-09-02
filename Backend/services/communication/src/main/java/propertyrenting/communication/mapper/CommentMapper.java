package propertyrenting.communication.mapper;

import propertyrenting.communication.enumeration.CommentStatus;
import propertyrenting.communication.model.Client;
import propertyrenting.communication.model.Comment;
import proto.comment.CommentMessage;
import proto.comment.CreateCommentMessage;

import java.time.LocalDateTime;

public class CommentMapper {

    public CommentMessage toCommentMessage(Comment comment) {
        String firstName;
        String surname;
        String email;
        if(comment.isTenantSender()) {
            firstName = comment.getBooking().getTenant().getFirstName();
            surname = comment.getBooking().getTenant().getSurname();
            email = comment.getBooking().getTenant().getEmail();
        }
        else {
            firstName = comment.getBooking().getLandlord().getFirstName();
            surname = comment.getBooking().getLandlord().getSurname();
            email = comment.getBooking().getLandlord().getEmail();
        }

        return CommentMessage.newBuilder()
                .setId(comment.getId())
                .setFirstName(firstName)
                .setSurname(surname)
                .setEmail(email)
                .setTimestamp(comment.getTimestamp().toString())
                .setContent(comment.getContent())
                .build();

    }

    public Comment toComment(CreateCommentMessage request, boolean isTenant) {
        return new Comment(request.getContent(), LocalDateTime.now(), CommentStatus.PENDING, isTenant);
    }
}
