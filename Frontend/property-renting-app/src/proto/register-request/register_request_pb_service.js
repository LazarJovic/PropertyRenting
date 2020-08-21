// package: 
// file: register_request.proto

var register_request_pb = require("./register_request_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RegisterRequestService = (function () {
  function RegisterRequestService() {}
  RegisterRequestService.serviceName = "RegisterRequestService";
  return RegisterRequestService;
}());

RegisterRequestService.CreateRegisterRequest = {
  methodName: "CreateRegisterRequest",
  service: RegisterRequestService,
  requestStream: false,
  responseStream: false,
  requestType: register_request_pb.RegisterRequestMessage,
  responseType: register_request_pb.CreateRegisterRequestResponse
};

RegisterRequestService.VerifyEmail = {
  methodName: "VerifyEmail",
  service: RegisterRequestService,
  requestStream: false,
  responseStream: false,
  requestType: register_request_pb.EmailVerificationMessage,
  responseType: register_request_pb.EmailVerificationResponse
};

exports.RegisterRequestService = RegisterRequestService;

function RegisterRequestServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RegisterRequestServiceClient.prototype.createRegisterRequest = function createRegisterRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RegisterRequestService.CreateRegisterRequest, {
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

RegisterRequestServiceClient.prototype.verifyEmail = function verifyEmail(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RegisterRequestService.VerifyEmail, {
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

exports.RegisterRequestServiceClient = RegisterRequestServiceClient;

