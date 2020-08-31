package propertyrenting.booking.mapper;

import propertyrenting.booking.model.BookingRequest;
import proto.bookingRequest.BookingRequestMessage;

public class BookingRequestMapper {

    public BookingRequestMessage toBookingRequestMessage(BookingRequest bookingRequest) {
        return BookingRequestMessage.newBuilder()
                .setId(bookingRequest.getId())
                .setAdId(bookingRequest.getBookingAd().getId())
                .setCountry(bookingRequest.getBookingAd().getCountry())
                .setCity(bookingRequest.getBookingAd().getCity())
                .setAddress(bookingRequest.getBookingAd().getAddress())
                .setPrice(bookingRequest.getBookingAd().getPricePerNight())
                .setSecurityDeposit((bookingRequest.getBookingAd().getSecurityDeposit()))
                .setPendingDateTime(bookingRequest.getPendingTime().toString())
                .setAcceptanceDateTime(bookingRequest.getAcceptanceTime().toString())
                .setBookingStart(bookingRequest.getBookingStart().toString())
                .setBookingEnd(bookingRequest.getBookingEnd().toString())
                .setClientEmail(bookingRequest.getBookingClient().getEmail())
                .build();
    }

}
