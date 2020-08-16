package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.property.model.PropertyType;
import propertyrenting.property.repository.PropertyTypeRepository;
import proto.propertyType.CreatePropertyTypeResponse;
import proto.propertyType.EmptyMessage;
import proto.propertyType.PropertyTypeMessage;
import proto.propertyType.PropertyTypeServiceGrpc;
import propertyrenting.property.mapper.PropertyTypeMapper;

import java.util.List;

@GrpcService
public class PropertyTypeServiceImpl extends PropertyTypeServiceGrpc.PropertyTypeServiceImplBase {

    private PropertyTypeMapper propertyTypeMapper;

    @Autowired
    private ValidationService validationService;

    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

    public PropertyTypeServiceImpl() {
        this.propertyTypeMapper = new PropertyTypeMapper();
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
        } else {
            PropertyType savedPropertyType = this.propertyTypeRepository
                    .save(this.propertyTypeMapper.toPropertyType(request));

            response = CreatePropertyTypeResponse.newBuilder()
                    .setPropertyType(this.propertyTypeMapper.toPropertyTypeMessage(savedPropertyType))
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

    public void getAllPropertyTypes(EmptyMessage request, StreamObserver<PropertyTypeMessage> responseObserver) {
        List<PropertyType> propertyTypes = this.propertyTypeRepository.findAll();
        propertyTypes.forEach(type -> {
            responseObserver.onNext(this.propertyTypeMapper.toPropertyTypeMessage(type));
        });

        responseObserver.onCompleted();
    }

    private String validatePropertyType(PropertyTypeMessage propertyTypeMessage) {
        if(validationService.isStringNullOrEmpty(propertyTypeMessage.getName())) {
            return "You must provide property type's name";
        }
        else if(propertyTypeMessage.getName().length() > 50) {
            return "Property type's name cannot be longer than 50 characters";
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
