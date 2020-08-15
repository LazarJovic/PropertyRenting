package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import proto.propertyType.PropertyTypeMessage;
import proto.propertyType.PropertyTypeServiceGrpc;

@GrpcService
public class PropertyTypeServiceImpl extends PropertyTypeServiceGrpc.PropertyTypeServiceImplBase {

    @Autowired
    private ValidationService validationService;

    public void createPropertyType(PropertyTypeMessage request, StreamObserver<PropertyTypeMessage> responseObserver) {

    }

}
