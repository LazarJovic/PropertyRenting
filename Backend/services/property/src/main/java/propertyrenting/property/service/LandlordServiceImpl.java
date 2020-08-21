package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.property.mapper.LandlordMapper;
import propertyrenting.property.model.Landlord;
import propertyrenting.property.repository.LandlordRepository;
import proto.propertyType.EmptyMessage;
import proto.user.CreateClientMessage;
import proto.user.UserServiceGrpc;

@GrpcService
public class LandlordServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    private LandlordRepository landlordRepository;

    private LandlordMapper landlordMapper;

    @Autowired
    public LandlordServiceImpl(LandlordRepository landlordRepository) {
        this.landlordRepository = landlordRepository;
        this.landlordMapper = new LandlordMapper();
    }

    public void createClient(CreateClientMessage request, StreamObserver<EmptyMessage> responseObserver) {
        Landlord landlord = this.landlordMapper.toLandlord(request);
        this.landlordRepository.save(landlord);
        responseObserver.onNext(EmptyMessage.newBuilder().build());
        responseObserver.onCompleted();
    }

}
