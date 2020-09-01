package propertyrenting.booking.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import propertyrenting.booking.enumeration.BookingRequestStatus;
import propertyrenting.booking.mapper.BookingRequestMapper;
import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.model.BookingRequest;
import propertyrenting.booking.repository.BookingAdRepository;
import propertyrenting.booking.repository.BookingRequestRepository;
import proto.bookingRequest.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@GrpcService
public class BookingRequestServiceImpl extends BookingRequestServiceGrpc.BookingRequestServiceImplBase {

    private BookingRequestRepository bookingRequestRepository;

    private ValidationService validationService;

    private BookingAdRepository bookingAdRepository;

    private BookingRequestMapper bookingRequestMapper;

    private EmailService emailService;

    @Autowired
    public BookingRequestServiceImpl(BookingRequestRepository bookingRequestRepository, ValidationService validationService,
                                     BookingAdRepository bookingAdRepository, EmailService emailService) {
        this.bookingRequestRepository = bookingRequestRepository;
        this.validationService = validationService;
        this.bookingAdRepository = bookingAdRepository;
        this.emailService = emailService;
        this.bookingRequestMapper = new BookingRequestMapper();
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

    public void getRequestsByStatus(BookingRequestStatusMessage request, StreamObserver<BookingRequestMessage> responseObserver) {
        //TODO: Get requests by logged-in user (landlord or tenant)
        List<BookingRequest> requests = new ArrayList<>();
        switch (request.getStatus()) {
            case "PENDING": requests = this.bookingRequestRepository.findByStatus(BookingRequestStatus.PENDING.ordinal());
                break;
            case "RESERVED": requests = this.bookingRequestRepository.findByStatus(BookingRequestStatus.RESERVED.ordinal());
                break;
            case "PAID": requests = this.bookingRequestRepository.findByStatus(BookingRequestStatus.PAID.ordinal());
                break;
            case "FINISHED": requests = this.bookingRequestRepository.findByStatus(BookingRequestStatus.FINISHED.ordinal());
                break;
            case "CANCELED": requests = this.bookingRequestRepository.findByStatus(BookingRequestStatus.CANCELED.ordinal());
                break;
        }

        requests.forEach(bookingRequest -> {
            BookingRequestMessage message = this.bookingRequestMapper.toBookingRequestMessage(bookingRequest);
            responseObserver.onNext(message);
        });

        responseObserver.onCompleted();
    }

    public void acceptBookingRequest(BookingRequestIdMessage request,
                                     StreamObserver<ChangeRequestStatusResponse> responseObserver) {
        ChangeRequestStatusResponse response;
        BookingRequest bookingRequest = this.bookingRequestRepository.findById(request.getId()).orElseGet(null);
        if(bookingRequest == null || bookingRequest.getBookingRequestStatus() != BookingRequestStatus.PENDING) {
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("Request does not exist or it's status is not PENDING")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.RESERVED);
            bookingRequest.setAcceptanceTime(LocalDateTime.now());
            this.bookingRequestRepository.save(bookingRequest);
            //TODO: Create Booking object in CommunicationService (asynchronous)
            emailService.sendSimpleMessage(
                    bookingRequest.getBookingClient().getEmail(),
                    "Booking request accepted",
                    "Booking request for property on location " + bookingRequest.getBookingAd().getAddress() + ", "
                            + bookingRequest.getBookingAd().getCity() + ", " + bookingRequest.getBookingAd().getCountry()
                            + " is accepted. You have now 2 day to pay security deposit in value of " +
                            bookingRequest.getBookingAd().getSecurityDeposit() + " euros, otherwise, request will be" +
                            "canceled. So, please, check you booking requests list."
            );
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    public void denyBookingRequest(BookingRequestIdMessage request,
                                   StreamObserver<ChangeRequestStatusResponse> responseObserver) {
        ChangeRequestStatusResponse response;
        BookingRequest bookingRequest = this.bookingRequestRepository.findById(request.getId()).orElseGet(null);
        if(bookingRequest == null || bookingRequest.getBookingRequestStatus() != BookingRequestStatus.PENDING) {
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("Request does not exist or it's status is not PENDING")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.CANCELED);
            this.bookingRequestRepository.save(bookingRequest);
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    public void finishBookingRequest(BookingRequestIdMessage request,
                                     StreamObserver<ChangeRequestStatusResponse> responseObserver) {
        ChangeRequestStatusResponse response;
        BookingRequest bookingRequest = this.bookingRequestRepository.findById(request.getId()).orElseGet(null);
        if(bookingRequest == null || bookingRequest.getBookingRequestStatus() != BookingRequestStatus.PAID) {
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("Request does not exist or it's status is not PAID")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.FINISHED);
            this.bookingRequestRepository.save(bookingRequest);
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    public void cancelBookingRequest(BookingRequestIdMessage request,
                                     StreamObserver<ChangeRequestStatusResponse> responseObserver) {
        ChangeRequestStatusResponse response;
        BookingRequest bookingRequest = this.bookingRequestRepository.findById(request.getId()).orElseGet(null);
        if(bookingRequest == null) {
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("Request does not exist")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.CANCELED);
            this.bookingRequestRepository.save(bookingRequest);
            response = ChangeRequestStatusResponse.newBuilder()
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

    @Scheduled(fixedDelay = 300000)
    public void checkBookingRequests() {

        //Zahtev koji nije obrađen 24h automatski prelazi u stanje CANCELED
        List<BookingRequest> candidates = this.bookingRequestRepository.findByStatus(BookingRequestStatus.PENDING.ordinal());
        candidates.forEach(request -> {
            if (request.getPendingTime().plusHours(24).isBefore(LocalDateTime.now())) {
                request.setBookingRequestStatus(BookingRequestStatus.CANCELED);
                this.bookingRequestRepository.save(request);
            }
        });

        //Onaj koji je prihvaćen, prelazi u stanje RESERVED pri čemu korisnik ima 2 dana da izvrši online plaćanje
        candidates = this.bookingRequestRepository.findByStatus(BookingRequestStatus.RESERVED.ordinal());

        candidates.forEach(request -> {
            if (request.getAcceptanceTime().plusDays(2).isBefore(LocalDateTime.now())) {
                request.setBookingRequestStatus(BookingRequestStatus.CANCELED);
                this.bookingRequestRepository.save(request);
            }
        });
    }

}
