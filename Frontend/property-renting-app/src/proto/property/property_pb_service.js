// package: 
// file: property.proto

var property_pb = require("./property_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PropertyService = (function () {
  function PropertyService() {}
  PropertyService.serviceName = "PropertyService";
  return PropertyService;
}());

PropertyService.RegisterProperty = {
  methodName: "RegisterProperty",
  service: PropertyService,
  requestStream: false,
  responseStream: false,
  requestType: property_pb.PropertyMessage,
  responseType: property_pb.RegisterPropertyResponse
};

exports.PropertyService = PropertyService;

function PropertyServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PropertyServiceClient.prototype.registerProperty = function registerProperty(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PropertyService.RegisterProperty, {
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

exports.PropertyServiceClient = PropertyServiceClient;

