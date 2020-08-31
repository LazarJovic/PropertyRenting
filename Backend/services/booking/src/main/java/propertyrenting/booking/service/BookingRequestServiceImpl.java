package propertyrenting.booking.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.model.BookingRequest;
import propertyrenting.booking.repository.BookingAdRepository;
import propertyrenting.booking.repository.BookingRequestRepository;
import proto.bookingRequest.BookingRequestServiceGrpc;
import proto.bookingRequest.CheckAvailabilityMessage;
import proto.bookingRequest.CheckAvailabilityResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@GrpcService
public class BookingRequestServiceImpl extends BookingRequestServiceGrpc.BookingRequestServiceImplBase {

    private BookingRequestRepository bookingRequestRepository;

    private ValidationService validationService;

    private BookingAdRepository bookingAdRepository;

    @Autowired
    public BookingRequestServiceImpl(BookingRequestRepository bookingRequestRepository, ValidationService validationService,
                                     BookingAdRepository bookingAdRepository) {
        this.bookingRequestRepository = bookingRequestRepository;
        this.validationService = validationService;
        this.bookingAdRepository = bookingAdRepository;
    }

    public void checkAvailability(CheckAvailabilityMessage request,
                                  StreamObserver<CheckAvailabilityResponse> responseObserver) {

        CheckAvailabilityResponse response;
        BookingAd bookingAd = this.bookingAdRepository.findById(request.getAdId()).orElseGet(null);

        String validationMessage = this.validationService.validateCheckAvailability(request,
                bookingAd.getStartDate(), bookingAd.getEndDate());
        if(!validationMessage.equals("OK") || this.checkForAvailabilityConflicts(this.bookingRequestRepository.findPropertyReservedAndPaid(bookingAd.getPropertyId()),
                LocalDate.parse(request.getStartDate()), LocalDate.parse(request.getEndDate()))) {

            response = CheckAvailabilityResponse.newBuilder()
                    .setAvailable(false)
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            response = CheckAvailabilityResponse.newBuilder()
                    .setAvailable(true)
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    private boolean checkForAvailabilityConflicts(List<BookingRequest> requests, LocalDate requestStart, LocalDate requestEnd) {
        for(BookingRequest bookingRequest : requests) {
            if(this.validationService.isThereConflictBetweenTheseTwoDateTimes(bookingRequest.getBookingStart(),
                    bookingRequest.getBookingEnd(), requestStart,requestEnd)) {
                return true;
            }
        }

        return false;
    }

}
