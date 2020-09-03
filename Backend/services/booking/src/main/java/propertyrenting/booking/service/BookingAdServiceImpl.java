package propertyrenting.booking.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.booking.mapper.BookingAdMapper;
import propertyrenting.booking.model.BookingAd;
import propertyrenting.booking.repository.BookingAdRepository;
import proto.bookingAd.BookingAdDataMessage;
import proto.bookingAd.BookingAdServiceGrpc;
import proto.bookingAd.CrateBookingAdResponse;

@GrpcService
public class BookingAdServiceImpl extends BookingAdServiceGrpc.BookingAdServiceImplBase {

    private BookingAdRepository bookingAdRepository;

    private BookingAdMapper bookingAdMapper;

    @Autowired
    public BookingAdServiceImpl(BookingAdRepository bookingAdRepository) {
        this.bookingAdRepository = bookingAdRepository;
        this.bookingAdMapper = new BookingAdMapper();
    }

    public void createBookingAd(BookingAdDataMessage request,
                                StreamObserver<CrateBookingAdResponse> responseObserver) {
        BookingAd bookingAd = this.bookingAdMapper.toBookingAd(request);
        this.bookingAdRepository.save(bookingAd);
        CrateBookingAdResponse response = CrateBookingAdResponse.newBuilder()
                .setReturnMessage("OK")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}
