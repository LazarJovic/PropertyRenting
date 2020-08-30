package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.communication.mapper.CommentMapper;
import propertyrenting.communication.model.Comment;
import propertyrenting.communication.repository.CommentRepository;
import proto.comment.CommentIdMessage;
import proto.comment.CommentMessage;
import proto.comment.CommentServiceGrpc;
import proto.propertyType.EmptyMessage;

import java.util.List;

@GrpcService
public class CommentService extends CommentServiceGrpc.CommentServiceImplBase {

    private CommentRepository commentRepository;

    private CommentMapper commentMapper;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
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

    }

    public void denyComment(CommentIdMessage request, StreamObserver<CommentMessage> responseObserver) {

    }

}
