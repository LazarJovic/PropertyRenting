package propertyrenting.property.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import propertyrenting.property.mapper.ClientMapper;
import propertyrenting.property.model.Client;
import propertyrenting.property.repository.ClientRepository;
import proto.propertyType.EmptyMessage;
import proto.user.CreateClientMessage;
import proto.user.UserServiceGrpc;

import java.sql.Timestamp;

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
        Client client = this.clientMapper.toLandlord(request);
        this.clientRepository.save(client);
        responseObserver.onNext(EmptyMessage.newBuilder().build());
        responseObserver.onCompleted();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void createAdmin() {

        if(this.clientRepository.findAll().size() != 0) {
            return;
        }

        Client client = new Client((long)1, "Admir", "Admirovic", "admin@maildrop.cc");

        this.clientRepository.save(client);
    }

}
