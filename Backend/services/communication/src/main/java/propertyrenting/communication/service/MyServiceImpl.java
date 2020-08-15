package propertyrenting.communication.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import proto.hello.HelloReply;
import proto.hello.HelloRequest;
import proto.hello.MyServiceGrpc;

@GrpcService
public class MyServiceImpl extends MyServiceGrpc.MyServiceImplBase {

    public void sayHello(HelloRequest request, StreamObserver<HelloReply> responseObserver) {
        HelloReply reply = HelloReply.newBuilder()
                .setMessage("Hello ==> " + request.getName())
                .build();
        responseObserver.onNext(reply);
        responseObserver.onCompleted();
    }
}
