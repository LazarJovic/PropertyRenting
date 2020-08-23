package propertyrenting.ad.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.ad.mapper.AdMapper;
import propertyrenting.ad.model.Ad;
import propertyrenting.ad.model.PropertyInfo;
import propertyrenting.ad.repository.AdRepository;
import propertyrenting.ad.repository.PropertyInfoRepository;
import proto.ad.AdImageMessage;
import proto.ad.AdMessage;
import proto.ad.AdServiceGrpc;
import proto.ad.CreateAdResponse;

import java.util.List;

@GrpcService
public class AdServiceImpl extends AdServiceGrpc.AdServiceImplBase {

    private AdRepository adRepository;

    private PropertyInfoRepository propertyInfoRepository;

    private ValidationService validationService;

    private AdImageService adImageService;

    private AdMapper adMapper;

    @Autowired
    public AdServiceImpl(AdRepository adRepository, PropertyInfoRepository propertyInfoRepository,
                         ValidationService validationService, AdImageService adImageService) {
        this.adRepository = adRepository;
        this.propertyInfoRepository = propertyInfoRepository;
        this.validationService = validationService;
        this.adImageService = adImageService;
        this.adMapper = new AdMapper();
    }

    public void createAd(AdMessage request, StreamObserver<CreateAdResponse> responseObserver) {
        CreateAdResponse response;
        String validationMessage = this.validateAd(request);
        if(!validationMessage.equals("ok")) {
            response = CreateAdResponse.newBuilder()
                    .setAd(request)
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            PropertyInfo propertyInfo = this.propertyInfoRepository.getOne(request.getPropertyId());

            Ad ad = this.adMapper.toAd(request);
            ad.setPropertyInfo(propertyInfo);

            Ad savedAd = this.adRepository.save(ad);

            List<AdImageMessage> images = this.adImageService.createAdImages(request.getImagesList(), savedAd.getId());

            response = CreateAdResponse.newBuilder()
                    .setAd(this.adMapper.toAdMessage(savedAd))
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        }
    }

    private String validateAd(AdMessage adMessage) {
        PropertyInfo propertyInfo = this.propertyInfoRepository.findById(adMessage.getPropertyId())
                .orElseGet(null);

        if(propertyInfo == null) {
            return "You must provide valida property";
        }
        else if(this.validationService.isStringNullOrEmpty(adMessage.getGuestPreference())) {
            return "You must provide guest preference";
        }
        else if(this.validationService.isStringNullOrEmpty(adMessage.getStartDate())) {
            return "You must provide ad's start date";
        }
        else if(this.validationService.checkDateFormat(adMessage.getStartDate())) {
            return "Start date is not in correct format";
        }
        else if(this.validationService.checkIfDoubleExistsAndIsNotNegative(adMessage.getPricePerNight())) {
            return "Price per night must be provided and cannot be non-positive number";
        }
        else if(this.validationService.checkIfDoubleExistsAndIsNotNegative(adMessage.getSecurityDeposit())) {
            return "Security deposit must be provided and cannot be non-positive number";
        }
        else if(this.validationService.isStringNullOrEmpty(adMessage.getAdditionalInfo())) {
            return "You must provide some additional information";
        }
        else if(adMessage.getAdditionalInfo().length() > 500) {
            return "Additional information can contain maximum 500 characters";
        }
        else if(adMessage.getImagesList().size() > 8) {
            return "You can upload maximum of 8 images for one ad";
        }

        if(adMessage.getDurationLimited()) {
            if(this.validationService.isStringNullOrEmpty(adMessage.getEndDate())) {
                return "You must provide ad's end date";
            }
            else if(this.validationService.checkDateFormat(adMessage.getEndDate())) {
                return "End date is not in correct format";
            }
        }

        return "ok";
    }

}
