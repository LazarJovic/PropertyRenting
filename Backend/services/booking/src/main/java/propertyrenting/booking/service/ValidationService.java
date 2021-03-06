package propertyrenting.booking.service;

import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Service;
import proto.bookingRequest.CheckAvailabilityMessage;
import proto.bookingRequest.CreateBookingRequestMessage;

import java.time.LocalDate;

@Service
public class ValidationService {

    public String validateCheckAvailability(CheckAvailabilityMessage request, LocalDate startDate,
                                            LocalDate endDate) {
        String result = this.validateDate(request.getStartDate());
        if(!result.equals("OK")) {
            return result;
        }
        result = this.validateDate(request.getEndDate());
        if(!result.equals("OK")) {
            return result;
        }
        LocalDate startCheckDate = LocalDate.parse(request.getStartDate());
        LocalDate endCheckDate = LocalDate.parse(request.getEndDate());
        if(startCheckDate.isAfter(endCheckDate)) {
            return "Renting start time cannot be after renting end time";
        }
        else if(startCheckDate.isBefore(startDate)) {
            return "Ad is not active in chosen time";
        }
        else if(endDate != null && endCheckDate.isAfter(endDate)) {
            return "Ad is not active in chosen time";
        }

        return "OK";
    }

    public String validateCreateBookingRequestMessage(CreateBookingRequestMessage request) {
        String result = this.validateDate(request.getBookingStart());
        if(!result.equals("OK")) {
            return result;
        }
        result = this.validateDate(request.getBookingEnd());
        if(!result.equals("OK")) {
            return result;
        }
        LocalDate startBookingDate = LocalDate.parse(request.getBookingStart());
        LocalDate endBookingDate = LocalDate.parse(request.getBookingEnd());
        if(startBookingDate.isAfter(endBookingDate)) {
            return "Booking start time cannot be after booking end time";
        }

        return "OK";
    }

    private String validateDate(String date) {
        try {
            LocalDate temp = LocalDate.parse(date);
        } catch (Exception e) {
            return "Incorrect format for date.";
        }
        return "OK";
    }

    public boolean isThereConflictBetweenTheseTwoDateTimes(LocalDate startDate1, LocalDate endDate1,
                                                           LocalDate startDate2, LocalDate endDate2) {
        return (!startDate1.isBefore(startDate2) && !startDate1.isAfter(endDate2)
                || !endDate1.isBefore(startDate2) && !endDate1.isAfter(endDate2))
                || (startDate1.isBefore(startDate2) && endDate1.isAfter(endDate2));
    }

}
