// package: 
// file: message.proto

var message_pb = require("./message_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MessageService = (function () {
  function MessageService() {}
  MessageService.serviceName = "MessageService";
  return MessageService;
}());

MessageService.CreateMessage = {
  methodName: "CreateMessage",
  service: MessageService,
  requestStream: false,
  responseStream: false,
  requestType: message_pb.CreateMessageRequest,
  responseType: message_pb.CreateMessageResponse
};

MessageService.GetAllRequestMessages = {
  methodName: "GetAllRequestMessages",
  service: MessageService,
  requestStream: false,
  responseStream: true,
  requestType: message_pb.GetRequestMessages,
  responseType: message_pb.MessageMessage
};

exports.MessageService = MessageService;

function MessageServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MessageServiceClient.prototype.createMessage = function createMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MessageService.CreateMessage, {
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

MessageServiceClient.prototype.getAllRequestMessages = function getAllRequestMessages(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MessageService.GetAllRequestMessages, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.MessageServiceClient = MessageServiceClient;

