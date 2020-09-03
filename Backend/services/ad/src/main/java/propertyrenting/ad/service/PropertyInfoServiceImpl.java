package propertyrenting.ad.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.ad.mapper.PropertyInfoMapper;
import propertyrenting.ad.model.PropertyInfo;
import propertyrenting.ad.repository.PropertyInfoRepository;
import proto.propertyInfo.PropertyInfoMessage;
import proto.propertyInfo.PropertyInfoServiceGrpc;
import proto.propertyInfo.UpdateRatingRequestMessage;
import proto.propertyInfo.UpdateRatingResponseMessage;
import proto.propertyType.EmptyMessage;

@GrpcService
public class PropertyInfoServiceImpl extends PropertyInfoServiceGrpc.PropertyInfoServiceImplBase {

    private PropertyInfoRepository propertyInfoRepository;

    private PropertyInfoMapper propertyInfoMapper;

    @Autowired
    public PropertyInfoServiceImpl(PropertyInfoRepository propertyInfoRepository) {
        this.propertyInfoRepository = propertyInfoRepository;
        this.propertyInfoMapper = new PropertyInfoMapper();
    }

    public void createPropertyInfo(PropertyInfoMessage request, StreamObserver<EmptyMessage> responseObserver) {
        this.propertyInfoRepository.save(this.propertyInfoMapper.toPropertyInfo(request));
        responseObserver.onNext(EmptyMessage.newBuilder().build());
        responseObserver.onCompleted();
    }

    public void updateRatingPropertyInfo(UpdateRatingRequestMessage request,
                                         StreamObserver<UpdateRatingResponseMessage> responseObserver) {
        PropertyInfo propertyInfo = this.propertyInfoRepository.findById(request.getPropertyId()).orElseGet(null);
        propertyInfo.setAverageRating(request.getAverageRating());
        PropertyInfo savedPropertyInfo = this.propertyInfoRepository.save(propertyInfo);
        UpdateRatingResponseMessage response = UpdateRatingResponseMessage.newBuilder()
                .setAverageRating(savedPropertyInfo.getAverageRating())
                .setReturnMessage("OK")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

}
