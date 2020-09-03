package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.client.inject.GrpcClient;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.property.mapper.PropertyImageMapper;
import propertyrenting.property.mapper.PropertyMapper;
import propertyrenting.property.model.Property;
import propertyrenting.property.model.PropertyImage;
import propertyrenting.property.model.PropertyType;
import propertyrenting.property.repository.PropertyRepository;
import propertyrenting.property.repository.PropertyTypeRepository;
import proto.ad.AdServiceGrpc;
import proto.ad.CheckDeletePropertyResponse;
import proto.bookingRequest.BookingRequestServiceGrpc;
import proto.bookingRequest.MostRentedPropertiesMessage;
import proto.bookingRequest.RentedPropertyMessage;
import proto.property.*;
import proto.propertyInfo.PropertyInfoServiceGrpc;
import proto.propertyType.EmptyMessage;

import java.util.List;

@GrpcService
public class PropertyServiceImpl extends PropertyServiceGrpc.PropertyServiceImplBase {

    private PropertyRepository propertyRepository;

    private PropertyTypeRepository propertyTypeRepository;

    private ValidationService validationService;

    private PropertyImageService propertyImageService;

    private PropertyMapper propertyMapper;

    private PropertyImageMapper propertyImageMapper;

    @GrpcClient("ad-server")
    private PropertyInfoServiceGrpc.PropertyInfoServiceStub propertyInfoServiceStub;

    @GrpcClient("ad-server")
    private AdServiceGrpc.AdServiceBlockingStub adServiceBlockingStub;

    @GrpcClient("booking-server")
    private BookingRequestServiceGrpc.BookingRequestServiceBlockingStub bookingRequestServiceBlockingStub;

    @Autowired
    public PropertyServiceImpl(PropertyRepository propertyRepository, PropertyTypeRepository propertyTypeRepository,
                               PropertyImageService propertyImageService, ValidationService validationService) {
        this.propertyRepository = propertyRepository;
        this.propertyTypeRepository = propertyTypeRepository;
        this.propertyImageService = propertyImageService;
        this.validationService = validationService;
        this.propertyMapper = new PropertyMapper();
        this.propertyImageMapper = new PropertyImageMapper();
    }

    public void registerProperty(PropertyMessage request, StreamObserver<RegisterPropertyResponse> responseObserver) {
        RegisterPropertyResponse response;
        String validationMessage = this.validateProperty(request);
        if(!validationMessage.equals("ok")) {
            response = RegisterPropertyResponse.newBuilder()
                    .setProperty(request)
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            PropertyType propertyType = this.propertyTypeRepository.getOne(request.getTypeId());

            // TODO: Get logged-in user and set it as a property landlord

            Property property = this.propertyMapper.toProperty(request);
            property.setPropertyType(propertyType);

            Property savedProperty = this.propertyRepository.save(property);

            PropertyImageMessage imageMessage = this.propertyImageService.createPropertyImage(request.getImage(), savedProperty.getId());

            this.propertyInfoServiceStub.createPropertyInfo(propertyMapper.toPropertyInfoMessage(savedProperty),
                    new StreamObserver<EmptyMessage>() {
                        @Override
                        public void onNext(EmptyMessage emptyMessage) {}

                        @Override
                        public void onError(Throwable throwable) {}

                        @Override
                        public void onCompleted() {}
                    });

            response = RegisterPropertyResponse.newBuilder()
                    .setProperty(this.propertyMapper.toPropertyMessage(savedProperty, imageMessage))
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        }
    }

    public void deleteProperty(PropertyIdMessage request, StreamObserver<DeletePropertyResponse> responseObserver) {
        DeletePropertyResponse response;
        Property property = this.propertyRepository.findById(request.getId()).orElseGet(null);
        if(property == null) {
            response = DeletePropertyResponse.newBuilder()
                    .setReturnMessage("Selected property does not exist")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            CheckDeletePropertyResponse checkResponse = this.adServiceBlockingStub.checkDeleteProperty(request);
            if(checkResponse.getCanBeDeleted()) {
                property.setDeleted(true);
                this.propertyRepository.save(property);
                response = DeletePropertyResponse.newBuilder()
                        .setReturnMessage("OK")
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
            }
            else {
                response = DeletePropertyResponse.newBuilder()
                        .setReturnMessage("Property cannot be deleted. You have to delete ads of this property first.")
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
            }
        }
    }

    public void getMyProperties(EmptyMessage request, StreamObserver<PropertyMessage> responseObserver) {
        // TODO: Get only properties of logged-in user
        List<Property> properties = this.propertyRepository.findAllActive();

        properties.forEach(property -> {
            PropertyImage image = property.getPropertyImagesSet().iterator().next();
            PropertyMessage message = this.propertyMapper.toPropertyMessage(property,
                    this.propertyImageMapper.toPropertyImageMessage(image));
            responseObserver.onNext(message);
        });

        responseObserver.onCompleted();
    }

    public void getByAverageRating(EmptyMessage request, StreamObserver<PropertyStatsMessage> responseObserver) {
        //TODO: Get properties of logged-in landlord
        List<Property> properties = this.propertyRepository.findTopFiveByRating();
        int i = 1;
        for (Property property : properties) {
            responseObserver.onNext(this.propertyMapper.toPropertyStatsMessage(property, i, 0));
            i++;
        }

        responseObserver.onCompleted();
    }

    public void getByNumberOfBookings(EmptyMessage request, StreamObserver<PropertyStatsMessage> responseObserver) {
        MostRentedPropertiesMessage response = this.bookingRequestServiceBlockingStub.getMostRentedProperties(
                EmptyMessage.newBuilder().build()
        );

        int i = 1;
        for (RentedPropertyMessage message : response.getIdsList()) {
            Property property = this.propertyRepository.findById(message.getId()).orElseGet(null);
            responseObserver.onNext(this.propertyMapper.toPropertyStatsMessage(
                    property, i, message.getRents()
            ));
            i++;
            if (i == 6)
                break;
        }

        responseObserver.onCompleted();

    }

    public void updateRatingProperty(UpdatePropertyRatingRequestMessage request,
                                     StreamObserver<UpdatePropertyRatingResponseMessage> responseObserver) {
        Property property = this.propertyRepository.findById(request.getPropertyId()).orElseGet(null);
        property.setAverageRating(request.getAverageRating());
        Property savedPropertyInfo = this.propertyRepository.save(property);
        UpdatePropertyRatingResponseMessage response = UpdatePropertyRatingResponseMessage.newBuilder()
                .setAverageRating(savedPropertyInfo.getAverageRating())
                .setReturnMessage("OK")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    private String validateProperty(PropertyMessage propertyMessage) {
        PropertyType propertyType = this.propertyTypeRepository.findById(propertyMessage.getTypeId())
                .orElseGet(null);

        if(propertyType == null) {
            return "You must provide valid property type";
        }
        else if(this.validationService.isStringNullOrEmpty(propertyMessage.getCountry())) {
            return "You must provide the country where property is located";
        }
        else if(this.validationService.checkStringLength(propertyMessage.getCountry())) {
            return "Country name should not be more than 50 characters long";
        }
        else if(this.validationService.isStringNullOrEmpty(propertyMessage.getCity())) {
            return "You must provide the city where property is located";
        }
        else if(this.validationService.checkStringLength(propertyMessage.getCity())) {
            return "City name should not be more than 50 characters long";
        }
        else if(this.validationService.isStringNullOrEmpty(propertyMessage.getAddress())) {
            return "You must provide the address where property is located";
        }
        else if(this.validationService.checkStringLength(propertyMessage.getAddress())) {
            return "Address should not be more than 50 characters long";
        }
        else if(this.validationService.checkIfDoubleExistsAndIsNotNegative(propertyMessage.getSize())) {
            return "Property size must be provided and cannot be non-positive number";
        }
        else if(this.validationService.checkIfIntExistsAndIsNotNegative(propertyMessage.getNumberOfRooms())) {
            return "Number of rooms must be provided and cannot be non-positive number";
        }
        else if(this.validationService.checkIfDoubleExistsAndIsNotNegative(propertyMessage.getDistanceFromCenter())) {
            return "Distance from center must be provided and cannot be non-positive number";
        }

        return "ok";
    }

}
