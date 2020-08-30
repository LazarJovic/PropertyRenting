// package: 
// file: comment.proto

var comment_pb = require("./comment_pb");
var property_type_pb = require("../property-type/property_type_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CommentService = (function () {
  function CommentService() {}
  CommentService.serviceName = "CommentService";
  return CommentService;
}());

CommentService.GetAllPendingComments = {
  methodName: "GetAllPendingComments",
  service: CommentService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: comment_pb.CommentMessage
};

CommentService.AcceptComment = {
  methodName: "AcceptComment",
  service: CommentService,
  requestStream: false,
  responseStream: false,
  requestType: comment_pb.CommentIdMessage,
  responseType: comment_pb.CommentMessage
};

CommentService.DenyComment = {
  methodName: "DenyComment",
  service: CommentService,
  requestStream: false,
  responseStream: false,
  requestType: comment_pb.CommentIdMessage,
  responseType: comment_pb.CommentMessage
};

exports.CommentService = CommentService;

function CommentServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CommentServiceClient.prototype.getAllPendingComments = function getAllPendingComments(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CommentService.GetAllPendingComments, {
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

CommentServiceClient.prototype.acceptComment = function acceptComment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommentService.AcceptComment, {
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

CommentServiceClient.prototype.denyComment = function denyComment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CommentService.DenyComment, {
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

exports.CommentServiceClient = CommentServiceClient;

