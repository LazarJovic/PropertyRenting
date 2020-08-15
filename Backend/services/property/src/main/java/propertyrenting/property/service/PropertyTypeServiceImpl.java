package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.property.model.PropertyType;
import propertyrenting.property.repository.PropertyTypeRepository;
import proto.propertyType.CreatePropertyTypeResponse;
import proto.propertyType.PropertyTypeMessage;
import proto.propertyType.PropertyTypeServiceGrpc;
import propertyrenting.property.mapper.ProprertyTypeMapper;

@GrpcService
public class PropertyTypeServiceImpl extends PropertyTypeServiceGrpc.PropertyTypeServiceImplBase {

    private ProprertyTypeMapper propertyTypeMapper;

    @Autowired
    private ValidationService validationService;

    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

    public PropertyTypeServiceImpl() {
        this.propertyTypeMapper = new ProprertyTypeMapper();
    }

    public void createPropertyType(PropertyTypeMessage request, StreamObserver<CreatePropertyTypeResponse> responseObserver) {
        CreatePropertyTypeResponse response;
        String validationMessage = this.validatePropertyType(request);
        if(!validationMessage.equals("ok")) {
            response = CreatePropertyTypeResponse.newBuilder()
                    .setPropertyType(request)
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }

        PropertyType savedPropertyType = this.propertyTypeRepository
                .save(this.propertyTypeMapper.toPropertyType(request));

        response = CreatePropertyTypeResponse.newBuilder()
                .setPropertyType(this.propertyTypeMapper.toPropertyTypeMessage(savedPropertyType))
                .setReturnMessage("OK")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();

    }

    private String validatePropertyType(PropertyTypeMessage propertyTypeMessage) {
        if(validationService.isStringNullOrEmpty(propertyTypeMessage.getName())) {
            return "You must provide property type's name";
        }
        else if(validationService.isStringNullOrEmpty(propertyTypeMessage.getDescription())) {
            return "You must provide property type's description";
        }
        else if(propertyTypeRepository.findByName(propertyTypeMessage.getName()) != null) {
            return "Property type with the given name already exists";
        }

        return "ok";
    }

}
