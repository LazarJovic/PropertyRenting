// package: 
// file: property_type.proto

var property_type_pb = require("./property_type_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PropertyTypeService = (function () {
  function PropertyTypeService() {}
  PropertyTypeService.serviceName = "PropertyTypeService";
  return PropertyTypeService;
}());

PropertyTypeService.CreatePropertyType = {
  methodName: "CreatePropertyType",
  service: PropertyTypeService,
  requestStream: false,
  responseStream: false,
  requestType: property_type_pb.PropertyTypeMessage,
  responseType: property_type_pb.CreatePropertyTypeResponse
};

PropertyTypeService.GetAllPropertyTypes = {
  methodName: "GetAllPropertyTypes",
  service: PropertyTypeService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: property_type_pb.PropertyTypeMessage
};

exports.PropertyTypeService = PropertyTypeService;

function PropertyTypeServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PropertyTypeServiceClient.prototype.createPropertyType = function createPropertyType(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PropertyTypeService.CreatePropertyType, {
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

PropertyTypeServiceClient.prototype.getAllPropertyTypes = function getAllPropertyTypes(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PropertyTypeService.GetAllPropertyTypes, {
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

exports.PropertyTypeServiceClient = PropertyTypeServiceClient;

