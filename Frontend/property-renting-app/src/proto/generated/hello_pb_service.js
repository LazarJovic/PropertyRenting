// package: 
// file: hello.proto

var hello_pb = require("./hello_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MyService = (function () {
  function MyService() {}
  MyService.serviceName = "MyService";
  return MyService;
}());

MyService.SayHello = {
  methodName: "SayHello",
  service: MyService,
  requestStream: false,
  responseStream: false,
  requestType: hello_pb.HelloRequest,
  responseType: hello_pb.HelloReply
};

exports.MyService = MyService;

function MyServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MyServiceClient.prototype.sayHello = function sayHello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyService.SayHello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.MyServiceClient = MyServiceClient;

