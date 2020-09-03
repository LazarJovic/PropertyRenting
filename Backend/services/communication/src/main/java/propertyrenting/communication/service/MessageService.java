package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.mapper.MessageMapper;
import propertyrenting.communication.model.Booking;
import propertyrenting.communication.model.Message;
import propertyrenting.communication.repository.BookingRepository;
import propertyrenting.communication.repository.MessageRepository;
import proto.message.*;

import java.util.List;

@GrpcService
public class MessageService extends MessageServiceGrpc.MessageServiceImplBase {

    private MessageRepository messageRepository;

    private BookingRepository bookingRepository;

    private MessageMapper messageMapper;

    @Autowired
    public MessageService(MessageRepository messageRepository, BookingRepository bookingRepository) {
        this.messageRepository = messageRepository;
        this.bookingRepository = bookingRepository;
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
        CreateMessageResponse response;
        String validationMessage = "OK";
        if (request.getContent() == null || request.getContent().equals("")) {
            validationMessage = "You must provide message content";
        }
        Booking booking = this.bookingRepository.getOne(request.getRequestId());

        if(!validationMessage.equals("OK")) {
            response = CreateMessageResponse.newBuilder()
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            //TODO: Check role of logged-in user and send it to mapper as isTenantSender
            Message message = this.messageMapper.toMessage(request, true);
            message.setBooking(booking);
            response = CreateMessageResponse.newBuilder()
                    .setMessage(this.messageMapper.toMessageMessage(this.messageRepository.save(message)))
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }

    }

}
