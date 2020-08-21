package propertyrenting.booking.mapper;

import propertyrenting.booking.model.BookingClient;
import proto.user.CreateClientMessage;

public class BookingClientMapper {

    public BookingClient toBookingClient(CreateClientMessage createClientMessage) {
        return new BookingClient(createClientMessage.getId(), createClientMessage.getFirstName(),
                createClientMessage.getSurname(), createClientMessage.getEmail());
    }

}
