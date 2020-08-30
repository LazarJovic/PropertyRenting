package propertyrenting.booking.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.repository.BookingAdRepository;
import propertyrenting.booking.repository.BookingRequestRepository;
import proto.bookingRequest.BookingRequestServiceGrpc;
import proto.bookingRequest.CheckAvailabilityMessage;
import proto.bookingRequest.CheckAvailabilityResponse;

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

        if(!validationMessage.equals("OK") ||
                this.bookingRequestRepository.isPropertyAvailable(bookingAd.getPropertyId()).size() != 0) {
            if(validationMessage.equals("OK")) {
                validationMessage = "Property is already rented in chosen period";
            }

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
}
