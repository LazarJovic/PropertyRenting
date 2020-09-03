package propertyrenting.booking.mapper;

import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.model.BookingRequest;
import proto.bookingRequest.BookingRequestMessage;
import proto.bookingRequest.CreateBookingRequestMessage;

import java.time.LocalDate;

public class BookingRequestMapper {

    public BookingRequestMessage toBookingRequestMessage(BookingRequest bookingRequest) {
        String acceptanceDateTime;
        if (bookingRequest.getAcceptanceTime() == null) {
            acceptanceDateTime = "";
        }
        else {
            acceptanceDateTime = bookingRequest.getAcceptanceTime().toString();
        }
        return BookingRequestMessage.newBuilder()
                .setId(bookingRequest.getId())
                .setAdId(bookingRequest.getBookingAd().getId())
                .setCountry(bookingRequest.getBookingAd().getCountry())
                .setCity(bookingRequest.getBookingAd().getCity())
                .setAddress(bookingRequest.getBookingAd().getAddress())
                .setPrice(bookingRequest.getBookingAd().getPricePerNight())
                .setSecurityDeposit((bookingRequest.getBookingAd().getSecurityDeposit()))
                .setPendingDateTime(bookingRequest.getPendingTime().toString())
                .setAcceptanceDateTime(acceptanceDateTime)
                .setBookingStart(bookingRequest.getBookingStart().toString())
                .setBookingEnd(bookingRequest.getBookingEnd().toString())
                .setClientEmail(bookingRequest.getBookingClient().getEmail())
                .setStatus(bookingRequest.getBookingRequestStatus().toString())
                .build();
    }

    public BookingRequest toBookingRequest(CreateBookingRequestMessage request) {
        return new BookingRequest(LocalDate.parse(request.getBookingStart()),
                LocalDate.parse(request.getBookingEnd()));
    }
}
