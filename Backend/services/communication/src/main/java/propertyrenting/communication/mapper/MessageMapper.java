package propertyrenting.communication.mapper;

import propertyrenting.communication.model.Booking;
import propertyrenting.communication.model.Message;
import proto.message.CreateMessageRequest;
import proto.message.MessageMessage;

import java.time.LocalDateTime;

public class MessageMapper {

    public MessageMessage toMessageMessage(Message message) {
        String name;
        String surname;
        String email;
        boolean isTenantSender = false;
        if(message.isRenterSender()) {
            name = message.getBooking().getTenant().getFirstName();
            surname = message.getBooking().getTenant().getFirstName();
            email = message.getBooking().getTenant().getEmail();
            isTenantSender = true;
        }
        else {
            name = message.getBooking().getLandlord().getFirstName();
            surname = message.getBooking().getLandlord().getSurname();
            email = message.getBooking().getLandlord().getEmail();
        }
        return MessageMessage.newBuilder()
                .setId(message.getId())
                .setContent(message.getContent())
                .setSenderName(name)
                .setSenderSurname(surname)
                .setSenderEmail(email)
                .setTimestamp(message.getTimestamp().toString())
                .setIsTenantSender(isTenantSender)
                .setBookingId(message.getBooking().getId())
                .build();
    }

    public Message toMessage(CreateMessageRequest request, boolean isTenantSender) {
        return new Message(request.getContent(), LocalDateTime.now(), isTenantSender);
    }
}
