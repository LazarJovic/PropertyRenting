package propertyrenting.ad.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.ad.mapper.AdMapper;
import propertyrenting.ad.model.Ad;
import propertyrenting.ad.model.PropertyInfo;
import propertyrenting.ad.repository.AdRepository;
import propertyrenting.ad.repository.PropertyInfoRepository;
import proto.ad.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
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

    public void searchAds(SearchAdMessage request, StreamObserver<SearchAdResultMessage> responseObserver) {
        List<SearchAdResultMessage> result = new ArrayList<>();
        String validationMessage = this.validateSearchAd(request);
        if(!validationMessage.equals("ok")) {
            responseObserver.onCompleted();
        }
        else {
            List<Ad> ads = this.adRepository.findAllActive();
            Iterator i = ads.iterator();
            while(i.hasNext()) {
                Ad ad = (Ad) i.next();
                if(!request.getStartDate().equals("") &&
                        LocalDate.parse(request.getStartDate()).isAfter(ad.getStartDate())) {
                    i.remove();
                    continue;
                }
                else if(!request.getEndDate().equals("") &&
                        LocalDate.parse(request.getEndDate()).isBefore(ad.getEndDate())) {
                    i.remove();
                    continue;
                }
                else if(!request.getType().equals("") && !ad.getPropertyInfo().getPropertyType().equals(request.getType())) {
                    i.remove();
                    continue;
                }
                else if(!request.getCountry().equals("") && !ad.getPropertyInfo().getCountry().contains(request.getCountry())) {
                    i.remove();
                    continue;
                }
                else if(!request.getCity().equals("") && !ad.getPropertyInfo().getCity().contains(request.getCity())) {
                    i.remove();
                    continue;
                }
                else if(!request.getAddress().equals("") && !ad.getPropertyInfo().getAddress().contains(request.getAddress())) {
                    i.remove();
                    continue;
                }
                else if(request.getSizeMin() != 0 && ad.getPropertyInfo().getSize() < request.getSizeMin()) {
                    i.remove();
                    continue;
                }
                else if(request.getSizeMax() != 0 && ad.getPropertyInfo().getSize() > request.getSizeMax()) {
                    i.remove();
                    continue;
                }
                else if(request.getNumberOfRoomsMin() != 0 &&
                        ad.getPropertyInfo().getNumberOfRooms() < request.getNumberOfRoomsMin()) {
                    i.remove();
                    continue;
                }
                else if(request.getNumberOfRoomsMax() != 0 &&
                        ad.getPropertyInfo().getNumberOfRooms() > request.getNumberOfRoomsMax()) {
                    i.remove();
                    continue;
                }
                else if(request.getDistanceFromCenterMin() != 0 &&
                        ad.getPropertyInfo().getDistanceFromCenter() < request.getDistanceFromCenterMin()) {
                    i.remove();
                    continue;
                }
                else if(request.getDistanceFromCenterMax() != 0 &&
                        ad.getPropertyInfo().getDistanceFromCenter() > request.getDistanceFromCenterMax()) {
                    i.remove();
                    continue;
                }
                else if(request.getPriceMin() != 0 &&
                        ad.getPricePerNight() < request.getPriceMin()) {
                    i.remove();
                    continue;
                }
                else if(request.getPriceMax() != 0 &&
                        ad.getPricePerNight() > request.getPriceMax()) {
                    i.remove();
                    continue;
                }
                else if(request.getFurnished() != ad.getPropertyInfo().isFurnished()) {
                    i.remove();
                    continue;
                }
                else if(request.getInternetIncluded() != ad.getPropertyInfo().isInternetIncluded()) {
                    i.remove();
                    continue;
                }
                else if(request.getAirConditionIncluded() != ad.getPropertyInfo().isAirConditionIncluded()) {
                    i.remove();
                    continue;
                }

                responseObserver.onNext(this.adMapper.toSearchResultMessage(ad));

            }

            responseObserver.onCompleted();
        }
    }

    public void getAdDetails(AdIdMessage request, StreamObserver<AdDetailsMessage> responseObserver) {
        Ad ad = this.adRepository.findById(request.getId()).orElseGet(null);
        responseObserver.onNext(this.adMapper.toAdDetailsMessage(ad));
        responseObserver.onCompleted();
    }

    private String validateSearchAd(SearchAdMessage searchAdMessage) {
        if(searchAdMessage.getStartDate() != null && !searchAdMessage.getStartDate().equals("") &&
                this.validationService.checkDateFormat(searchAdMessage.getStartDate())) {
            return "Wrong start date format";
        }
        else if(searchAdMessage.getEndDate() != null && !searchAdMessage.getEndDate().equals("") &&
                this.validationService.checkDateFormat(searchAdMessage.getEndDate())) {
            return "Wrong end date format";
        }

        return "ok";
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
