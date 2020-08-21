package propertyrenting.booking.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.booking.mapper.BookingClientMapper;
import propertyrenting.booking.model.BookingClient;
import propertyrenting.booking.repository.BookingClientRepository;
import proto.propertyType.EmptyMessage;
import proto.user.CreateClientMessage;
import proto.user.UserServiceGrpc;

@GrpcService
public class BookingClientServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    private BookingClientRepository bookingClientRepository;

    private BookingClientMapper bookingClientMapper;

    @Autowired
    public BookingClientServiceImpl(BookingClientRepository bookingClientRepository) {
        this.bookingClientRepository = bookingClientRepository;
        this.bookingClientMapper = new BookingClientMapper();
    }

    public void createClient(CreateClientMessage request, StreamObserver<EmptyMessage> responseObserver) {
        BookingClient client = this.bookingClientMapper.toBookingClient(request);
        this.bookingClientRepository.save(client);
        responseObserver.onNext(EmptyMessage.newBuilder().build());
        responseObserver.onCompleted();
    }

}
