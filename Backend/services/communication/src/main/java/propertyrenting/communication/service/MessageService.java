package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.mapper.MessageMapper;
import propertyrenting.communication.model.Message;
import propertyrenting.communication.repository.MessageRepository;
import proto.message.*;

import java.util.List;

@GrpcService
public class MessageService extends MessageServiceGrpc.MessageServiceImplBase {

    private MessageRepository messageRepository;

    private MessageMapper messageMapper;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
        this.messageMapper = new MessageMapper();
    }

    public void getAllRequestMessages(GetRequestMessages request, StreamObserver<MessageMessage> responseObserver) {
        List<Message> messages = this.messageRepository.findByBookingIdSortedByDate(request.getBookingId());
        messages.forEach(message -> {
            responseObserver.onNext(this.messageMapper.toMessageMessage(message));
        });

        responseObserver.onCompleted();
    }

    public void createMessage(CreateMessageRequest request, StreamObserver<CreateMessageResponse> responseObserver) {

    }

}
