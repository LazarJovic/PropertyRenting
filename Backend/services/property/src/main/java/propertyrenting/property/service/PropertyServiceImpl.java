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
import proto.property.PropertyImageMessage;
import proto.property.PropertyMessage;
import proto.property.PropertyServiceGrpc;
import proto.property.RegisterPropertyResponse;
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

    public void getMyProperties(EmptyMessage request, StreamObserver<PropertyMessage> responseObserver) {
        // TODO: Get only properties of logged-in user
        List<Property> properties = this.propertyRepository.findAll();

        properties.forEach(property -> {
            PropertyImage image = property.getPropertyImagesSet().iterator().next();
            PropertyMessage message = this.propertyMapper.toPropertyMessage(property,
                    this.propertyImageMapper.toPropertyImageMessage(image));
            responseObserver.onNext(message);
        });

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
