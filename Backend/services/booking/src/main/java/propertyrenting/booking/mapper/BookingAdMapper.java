package propertyrenting.booking.mapper;

import propertyrenting.booking.model.BookingAd;
import proto.bookingAd.BookingAdDataMessage;

import java.time.LocalDate;

public class BookingAdMapper {

    public BookingAd toBookingAd(BookingAdDataMessage bookingAdData) {
        return new BookingAd(bookingAdData.getId(), bookingAdData.getCountry(), bookingAdData.getCity(),
                bookingAdData.getAddress(), bookingAdData.getPricePerNight(), bookingAdData.getSecurityDeposit(),
                LocalDate.parse(bookingAdData.getStartDate()), LocalDate.parse(bookingAdData.getEndDate()),
                bookingAdData.getPropertyId(), bookingAdData.getLandlord());
    }
}
