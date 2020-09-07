package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.model.Booking;
import propertyrenting.communication.model.Client;
import propertyrenting.communication.repository.BookingRepository;
import propertyrenting.communication.repository.ClientRepository;
import proto.booking.BookingDataMessage;
import proto.booking.BookingServiceGrpc;
import proto.booking.CrateBookingResponse;

@GrpcService
public class BookingServiceImpl extends BookingServiceGrpc.BookingServiceImplBase {

    private BookingRepository bookingRepository;

    private ClientRepository clientRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository, ClientRepository clientRepository) {
        this.bookingRepository = bookingRepository;
        this.clientRepository = clientRepository;
    }

    public void createBooking(BookingDataMessage request, StreamObserver<CrateBookingResponse> responseObserver) {
        Client tenant = clientRepository.getOne(request.getTenant());
        Client landlord = clientRepository.getOne(request.getLandlord());
        Booking booking = new Booking(request.getId(), request.getAdId(), request.getPropertyId());
        booking.setTenant(tenant);
        booking.setLandlord(landlord);
        this.bookingRepository.save(booking);
        CrateBookingResponse response = CrateBookingResponse.newBuilder()
                .setReturnMessage("OK")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}
