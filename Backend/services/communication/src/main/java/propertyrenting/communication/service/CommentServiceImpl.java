package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import propertyrenting.communication.enumeration.CommentStatus;
import propertyrenting.communication.mapper.CommentMapper;
import propertyrenting.communication.model.Booking;
import propertyrenting.communication.model.Client;
import propertyrenting.communication.model.Comment;
import propertyrenting.communication.repository.BookingRepository;
import propertyrenting.communication.repository.ClientRepository;
import propertyrenting.communication.repository.CommentRepository;
import proto.comment.*;
import proto.property.PropertyIdMessage;
import proto.propertyType.EmptyMessage;

import java.util.List;

@GrpcService
public class CommentServiceImpl extends CommentServiceGrpc.CommentServiceImplBase {

    private CommentRepository commentRepository;

    private ClientRepository clientRepository;

    private BookingRepository bookingRepository;

    private CommentMapper commentMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, ClientRepository clientRepository,
                              BookingRepository bookingRepository) {
        this.commentRepository = commentRepository;
        this.clientRepository = clientRepository;
        this.bookingRepository = bookingRepository;
        this.commentMapper = new CommentMapper();
    }

    public void getAllPendingComments(EmptyMessage request, StreamObserver<CommentMessage> responseObserver) {
        List<Comment> pendingComments = this.commentRepository.findAllPending();
        pendingComments.forEach(comment -> {
            responseObserver.onNext(this.commentMapper.toCommentMessage(comment));
        });

        responseObserver.onCompleted();
    }

    public void acceptComment(CommentIdMessage request, StreamObserver<CommentMessage> responseObserver) {
        Comment comment = this.commentRepository.findById(request.getId()).orElseGet(null);
        comment.setStatus(CommentStatus.ACCEPTED);
        responseObserver.onNext(this.commentMapper.toCommentMessage(this.commentRepository.save(comment)));
        responseObserver.onCompleted();
    }

    public void denyComment(CommentIdMessage request, StreamObserver<CommentMessage> responseObserver) {
        Comment comment = this.commentRepository.findById(request.getId()).orElseGet(null);
        comment.setStatus(CommentStatus.DENIED);
        responseObserver.onNext(this.commentMapper.toCommentMessage(this.commentRepository.save(comment)));
        responseObserver.onCompleted();
    }

    public void getAllPropertyComments(PropertyIdCommentsMessage request, StreamObserver<CommentMessage> responseObserver) {
        List<Comment> propertyComments = this.commentRepository.findPropertyAccepted(request.getPropertyId());
        propertyComments.forEach(comment -> {
            responseObserver.onNext(this.commentMapper.toCommentMessage(comment));
        });

        responseObserver.onCompleted();
    }

    public void createComment(CreateCommentMessage request,
                              StreamObserver<CreateCommentMessageResponse> responseObserver) {

        CreateCommentMessageResponse response;
        Client client = (Client) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String validationMessage = "OK";
        if (request.getContent() == null || request.getContent().equals("")) {
            validationMessage = "Comment cannot be empty";
        }
        else if(this.commentRepository.findUsersCommentsForAd(client.getId(), request.getAdId()).size() != 0) {
            validationMessage = "You have already left comment for this ad";
        }

        if(!validationMessage.equals("OK")) {
            response = CreateCommentMessageResponse.newBuilder()
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            Booking booking = this.bookingRepository.findById(request.getRequestId()).orElseGet(null);
            boolean isTenant = false;
            if (client.getId() == booking.getTenant().getId()) {
                isTenant = true;
            }
            Comment newComment = this.commentMapper.toComment(request, isTenant);
            newComment.setBooking(booking);
            response = CreateCommentMessageResponse.newBuilder()
                    .setComment(this.commentMapper.toCommentMessage(this.commentRepository.save(newComment)))
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
    }

}
