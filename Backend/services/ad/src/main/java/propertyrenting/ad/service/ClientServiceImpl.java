package propertyrenting.ad.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.ad.mapper.ClientMapper;
import propertyrenting.ad.model.Client;
import propertyrenting.ad.repository.ClientRepository;
import proto.propertyType.EmptyMessage;
import proto.user.CreateClientMessage;
import proto.user.UserServiceGrpc;

@GrpcService
public class ClientServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    private ClientRepository clientRepository;

    private ClientMapper clientMapper;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
        this.clientMapper = new ClientMapper();
    }

    public void createClient(CreateClientMessage request, StreamObserver<EmptyMessage> responseObserver) {
        Client client = this.clientMapper.toClient(request);
        this.clientRepository.save(client);
        responseObserver.onNext(EmptyMessage.newBuilder().build());
        responseObserver.onCompleted();
    }

}
