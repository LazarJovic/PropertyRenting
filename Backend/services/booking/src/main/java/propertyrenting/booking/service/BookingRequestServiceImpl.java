package propertyrenting.booking.service;

import com.google.common.collect.Ordering;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import propertyrenting.booking.enumeration.BookingRequestStatus;
import propertyrenting.booking.mapper.BookingAdMapper;
import propertyrenting.booking.mapper.BookingRequestMapper;
import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.model.BookingClient;
import propertyrenting.booking.model.BookingRequest;
import propertyrenting.booking.repository.BookingAdRepository;
import propertyrenting.booking.repository.BookingClientRepository;
import propertyrenting.booking.repository.BookingRequestRepository;
import proto.ad.AdIdMessage;
import proto.booking.BookingDataMessage;
import proto.booking.BookingServiceGrpc;
import proto.bookingRequest.*;
import proto.propertyType.EmptyMessage;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@GrpcService
public class BookingRequestServiceImpl extends BookingRequestServiceGrpc.BookingRequestServiceImplBase {

    private BookingRequestRepository bookingRequestRepository;

    private ValidationService validationService;

    private BookingAdRepository bookingAdRepository;

    private BookingClientRepository bookingClientRepository;

    private BookingRequestMapper bookingRequestMapper;

    private BookingAdMapper bookingAdMapper;

    private EmailService emailService;

    @GrpcClient("communication-server")
    private BookingServiceGrpc.BookingServiceBlockingStub bookingServiceBlockingStub;

    @Autowired
    public BookingRequestServiceImpl(BookingRequestRepository bookingRequestRepository, ValidationService validationService,
                                     BookingAdRepository bookingAdRepository,
                                     BookingClientRepository bookingClientRepository, EmailService emailService) {
        this.bookingRequestRepository = bookingRequestRepository;
        this.validationService = validationService;
        this.bookingAdRepository = bookingAdRepository;
        this.emailService = emailService;
        this.bookingClientRepository = bookingClientRepository;
        this.bookingRequestMapper = new BookingRequestMapper();
        this.bookingAdMapper = new BookingAdMapper();
    }

    public void createBookingRequest(CreateBookingRequestMessage request,
                                     StreamObserver<CreateBookingRequestResponse> responseObserver) {
        BookingClient tenant = (BookingClient) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CreateBookingRequestResponse response;
        String validationMessage = this.validationService.validateCreateBookingRequestMessage(request);
        if(!validationMessage.equals("OK")) {
            response = CreateBookingRequestResponse.newBuilder()
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            BookingAd bookingAd = this.bookingAdRepository.findById(request.getAdId()).orElseGet(null);
            BookingAd savedBookingAd = null;

            BookingRequest bookingRequest = this.bookingRequestMapper.toBookingRequest(request);
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.PENDING);
            bookingRequest.setBookingClient(tenant);
            bookingRequest.setPendingTime(LocalDateTime.now());
            bookingRequest.setBookingAd(bookingAd);

            response = CreateBookingRequestResponse.newBuilder()
                    .setBookingRequest(this.bookingRequestMapper.toBookingRequestMessage(
                            this.bookingRequestRepository.save(bookingRequest)
                    ))
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();


        }
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

    public void getRequestsByStatusLandlord(BookingRequestStatusMessage request, StreamObserver<BookingRequestMessage> responseObserver) {
        BookingClient landlord = (BookingClient) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<BookingRequest> requests = new ArrayList<>();
        switch (request.getStatus()) {
            case "PENDING": requests = this.bookingRequestRepository.findByStatusLandlord(BookingRequestStatus.PENDING.ordinal(),
                    landlord.getId());
                break;
            case "RESERVED": requests = this.bookingRequestRepository.findByStatusLandlord(BookingRequestStatus.RESERVED.ordinal(),
                    landlord.getId());
                break;
            case "PAID": requests = this.bookingRequestRepository.findByStatusLandlord(BookingRequestStatus.PAID.ordinal(),
                    landlord.getId());
                break;
            case "FINISHED": requests = this.bookingRequestRepository.findByStatusLandlord(BookingRequestStatus.FINISHED.ordinal(),
                    landlord.getId());
                break;
            case "CANCELED": requests = this.bookingRequestRepository.findByStatusLandlord(BookingRequestStatus.CANCELED.ordinal(),
                    landlord.getId());
                break;
        }

        requests.forEach(bookingRequest -> {
            BookingRequestMessage message = this.bookingRequestMapper.toBookingRequestMessage(bookingRequest);
            responseObserver.onNext(message);
        });

        responseObserver.onCompleted();
    }

    public void getRequestsByStatusTenant(BookingRequestStatusMessage request, StreamObserver<BookingRequestMessage> responseObserver) {
        BookingClient tenant = (BookingClient) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<BookingRequest> requests = new ArrayList<>();
        switch (request.getStatus()) {
            case "PENDING": requests = this.bookingRequestRepository.findByStatusTenant(BookingRequestStatus.PENDING.ordinal(),
                    tenant.getId());
                break;
            case "RESERVED": requests = this.bookingRequestRepository.findByStatusTenant(BookingRequestStatus.RESERVED.ordinal(),
                    tenant.getId());
                break;
            case "PAID": requests = this.bookingRequestRepository.findByStatusTenant(BookingRequestStatus.PAID.ordinal(),
                    tenant.getId());
                break;
            case "FINISHED": requests = this.bookingRequestRepository.findByStatusTenant(BookingRequestStatus.FINISHED.ordinal(),
                    tenant.getId());
                break;
            case "CANCELED": requests = this.bookingRequestRepository.findByStatusTenant(BookingRequestStatus.CANCELED.ordinal(),
                    tenant.getId());
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
            BookingRequest savedRequest = this.bookingRequestRepository.save(bookingRequest);

            BookingDataMessage bookingDataMessage = BookingDataMessage.newBuilder()
                    .setId(savedRequest.getId())
                    .setAdId(savedRequest.getBookingAd().getId())
                    .setPropertyId(savedRequest.getBookingAd().getPropertyId())
                    .setTenant(savedRequest.getBookingClient().getId())
                    .setLandlord(savedRequest.getBookingAd().getLandlordId())
                    .build();
            this.bookingServiceBlockingStub.createBooking(bookingDataMessage);

            emailService.sendSimpleMessage(
                    bookingRequest.getBookingClient().getEmail(),
                    "Booking request accepted",
                    "Booking request for property on location " + bookingRequest.getBookingAd().getAddress() + ", "
                            + bookingRequest.getBookingAd().getCity() + ", " + bookingRequest.getBookingAd().getCountry()
                            + " is accepted. You have now 2 days to pay security deposit in value of " +
                            bookingRequest.getBookingAd().getSecurityDeposit() + " euros, otherwise, request will be" +
                            " canceled. So, please, check your booking requests list."
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

    public void payBookingRequest(BookingRequestIdMessage request,
                                  StreamObserver<ChangeRequestStatusResponse> responseObserver) {
        ChangeRequestStatusResponse response;
        BookingRequest bookingRequest = this.bookingRequestRepository.findById(request.getId()).orElseGet(null);
        if(bookingRequest == null || bookingRequest.getBookingRequestStatus() != BookingRequestStatus.RESERVED) {
            response = ChangeRequestStatusResponse.newBuilder()
                    .setReturnMessage("Request does not exist or it's status is not RESERVED")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            bookingRequest.setBookingRequestStatus(BookingRequestStatus.PAID);
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

    public void checkDeleteAd(AdIdMessage request, StreamObserver<CheckDeleteAdResponse> responseObserver) {
        CheckDeleteAdResponse response;
        if(this.bookingRequestRepository.findAdReservedAndPaid(request.getId()).size() != 0) {
            response = CheckDeleteAdResponse.newBuilder()
                    .setCanBeDeleted(false)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            List<BookingRequest> adPendingRequests = this.bookingRequestRepository.findAdPending(request.getId());
            adPendingRequests.forEach(bookingRequest -> {
                bookingRequest.setBookingRequestStatus(BookingRequestStatus.CANCELED);
                this.bookingRequestRepository.save(bookingRequest);
            });
            response = CheckDeleteAdResponse.newBuilder()
                    .setCanBeDeleted(true)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    public void getMostRentedProperties(EmptyMessage request,
                                        StreamObserver<MostRentedPropertiesMessage> responseObserver) {
        BookingClient landlord = (BookingClient) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (landlord == null) {
            MostRentedPropertiesMessage response = MostRentedPropertiesMessage.newBuilder().build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            List<Long> propertyIds = this.bookingRequestRepository.findAllRentedProperties(landlord.getId());
            HashMap<Long, Integer> mostRented = new HashMap<>();
            for (Long propertyId: propertyIds) {
                List<BookingRequest> propertyRentals = this.bookingRequestRepository.findPropertyPaidAndFinished(propertyId);
                mostRented.put(propertyId, propertyRentals.size());
            }

            HashMap<Long, Integer> sortedMap =
                    mostRented.entrySet().stream()
                            .sorted(Map.Entry.comparingByValue())
                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                                    (e1, e2) -> e1, LinkedHashMap::new));

            List<RentedPropertyMessage> rentedPropertyMessages = new ArrayList<>();
            for (Map.Entry<Long, Integer> entry : sortedMap.entrySet()) {
                RentedPropertyMessage rentedPropertyMessage = RentedPropertyMessage.newBuilder()
                        .setId(entry.getKey()).setRents(entry.getValue()).build();
                rentedPropertyMessages.add(rentedPropertyMessage);
            }

            MostRentedPropertiesMessage response = this.getMostRentedProperties(rentedPropertyMessages);
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }

    }

    private MostRentedPropertiesMessage getMostRentedProperties(List<RentedPropertyMessage> rentedPropertyMessages) {
        MostRentedPropertiesMessage response;
        switch (rentedPropertyMessages.size()) {
            case 5: response = MostRentedPropertiesMessage.newBuilder()
                    .addIds(rentedPropertyMessages.get(4))
                    .addIds(rentedPropertyMessages.get(3))
                    .addIds(rentedPropertyMessages.get(2))
                    .addIds(rentedPropertyMessages.get(1))
                    .addIds(rentedPropertyMessages.get(0))
                    .build();
                    break;
            case 4: response = MostRentedPropertiesMessage.newBuilder()
                    .addIds(rentedPropertyMessages.get(3))
                    .addIds(rentedPropertyMessages.get(2))
                    .addIds(rentedPropertyMessages.get(1))
                    .addIds(rentedPropertyMessages.get(0))
                    .build();
                    break;
            case 3: response = MostRentedPropertiesMessage.newBuilder()
                    .addIds(rentedPropertyMessages.get(2))
                    .addIds(rentedPropertyMessages.get(1))
                    .addIds(rentedPropertyMessages.get(0))
                    .build();
                    break;
            case 2:response = MostRentedPropertiesMessage.newBuilder()
                    .addIds(rentedPropertyMessages.get(1))
                    .addIds(rentedPropertyMessages.get(0))
                    .build();
                    break;
            case 1: response = MostRentedPropertiesMessage.newBuilder()
                    .addIds(rentedPropertyMessages.get(0))
                    .build();
                    break;
            default: response = MostRentedPropertiesMessage.newBuilder()
                    .build();
                    break;
        }

        return response;
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
