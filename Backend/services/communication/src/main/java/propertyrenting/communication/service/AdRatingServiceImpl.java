package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.mapper.AdRatingMapper;
import propertyrenting.communication.model.AdRating;
import propertyrenting.communication.model.Booking;
import propertyrenting.communication.repository.AdRatingRepository;
import propertyrenting.communication.repository.BookingRepository;
import proto.adRating.AdRatingMessage;
import proto.adRating.AdRatingServiceGrpc;
import proto.adRating.RateAdResponseMessage;
import proto.property.PropertyServiceGrpc;
import proto.property.UpdatePropertyRatingRequestMessage;
import proto.propertyInfo.PropertyInfoServiceGrpc;
import proto.propertyInfo.UpdateRatingRequestMessage;
import proto.propertyInfo.UpdateRatingResponseMessage;

@GrpcService
public class AdRatingServiceImpl extends AdRatingServiceGrpc.AdRatingServiceImplBase {

    private AdRatingRepository adRatingRepository;

    private BookingRepository bookingRepository;

    private AdRatingMapper adRatingMapper;

    @GrpcClient("ad-server")
    private PropertyInfoServiceGrpc.PropertyInfoServiceBlockingStub propertyInfoServiceBlockingStub;

    @GrpcClient("property-server")
    private PropertyServiceGrpc.PropertyServiceBlockingStub propertyServiceBlockingStub;

    @Autowired
    public AdRatingServiceImpl(AdRatingRepository adRatingRepository, BookingRepository bookingRepository) {
        this.adRatingRepository = adRatingRepository;
        this.bookingRepository = bookingRepository;
        this.adRatingMapper = new AdRatingMapper();
    }

    public void rateAd(AdRatingMessage request, StreamObserver<RateAdResponseMessage> responseObserver) {
        RateAdResponseMessage response;
        //TODO: Get logged-in user
        if(this.alreadyRated((long) 2, request.getAdId())) {
            response = RateAdResponseMessage.newBuilder()
                    .setReturnMessage("Ad can be rated only once. You have already rated this ad")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            AdRating adRating = new AdRating();
            Booking booking = this.bookingRepository.getOne(request.getRequestId());
            adRating.setRating(request.getRating());
            adRating.setBooking(booking);
            AdRating savedRating = this.adRatingRepository.save(adRating);
            double avg = this.adRatingRepository.vehicleRatingAverage(request.getPropertyId());

            UpdateRatingRequestMessage updateMessageAd = UpdateRatingRequestMessage.newBuilder()
                    .setPropertyId(request.getPropertyId())
                    .setAverageRating(avg)
                    .build();
            this.propertyInfoServiceBlockingStub.updateRatingPropertyInfo(updateMessageAd);

            UpdatePropertyRatingRequestMessage updateMessageProperty = UpdatePropertyRatingRequestMessage.newBuilder()
                    .setPropertyId(request.getPropertyId())
                    .setAverageRating(avg)
                    .build();
            this.propertyServiceBlockingStub.updateRatingProperty(updateMessageProperty);

            response = RateAdResponseMessage.newBuilder()
                    .setRatingMessage(this.adRatingMapper.toAdRatingMessage(savedRating, avg))
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    private boolean alreadyRated(Long userId, Long adId) {
        if(this.adRatingRepository.isAdRatedByUser(userId, adId) != null) {
            return true;
        }
        return false;
    }

}
