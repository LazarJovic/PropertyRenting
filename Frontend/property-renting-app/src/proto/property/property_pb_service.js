// package: 
// file: property.proto

var property_pb = require("./property_pb");
var property_type_pb = require("../property-type/property_type_pb");
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

PropertyService.GetMyProperties = {
  methodName: "GetMyProperties",
  service: PropertyService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: property_pb.PropertyMessage
};

PropertyService.DeleteProperty = {
  methodName: "DeleteProperty",
  service: PropertyService,
  requestStream: false,
  responseStream: false,
  requestType: property_pb.PropertyIdMessage,
  responseType: property_pb.DeletePropertyResponse
};

PropertyService.GetByNumberOfBookings = {
  methodName: "GetByNumberOfBookings",
  service: PropertyService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: property_pb.PropertyStatsMessage
};

PropertyService.GetByAverageRating = {
  methodName: "GetByAverageRating",
  service: PropertyService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: property_pb.PropertyStatsMessage
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

PropertyServiceClient.prototype.getMyProperties = function getMyProperties(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PropertyService.GetMyProperties, {
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

PropertyServiceClient.prototype.deleteProperty = function deleteProperty(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PropertyService.DeleteProperty, {
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

PropertyServiceClient.prototype.getByNumberOfBookings = function getByNumberOfBookings(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PropertyService.GetByNumberOfBookings, {
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

PropertyServiceClient.prototype.getByAverageRating = function getByAverageRating(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PropertyService.GetByAverageRating, {
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

exports.PropertyServiceClient = PropertyServiceClient;

