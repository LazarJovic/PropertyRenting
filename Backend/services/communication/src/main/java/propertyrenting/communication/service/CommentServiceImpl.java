package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.enumeration.CommentStatus;
import propertyrenting.communication.mapper.CommentMapper;
import propertyrenting.communication.model.Comment;
import propertyrenting.communication.repository.CommentRepository;
import proto.comment.*;
import proto.property.PropertyIdMessage;
import proto.propertyType.EmptyMessage;

import java.util.List;

@GrpcService
public class CommentServiceImpl extends CommentServiceGrpc.CommentServiceImplBase {

    private CommentRepository commentRepository;

    private CommentMapper commentMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
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

    }

}
