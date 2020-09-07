// package: 
// file: booking_request.proto

var booking_request_pb = require("./booking_request_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var BookingRequestService = (function () {
  function BookingRequestService() {}
  BookingRequestService.serviceName = "BookingRequestService";
  return BookingRequestService;
}());

BookingRequestService.CheckAvailability = {
  methodName: "CheckAvailability",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.CheckAvailabilityMessage,
  responseType: booking_request_pb.CheckAvailabilityResponse
};

BookingRequestService.GetRequestsByStatusTenant = {
  methodName: "GetRequestsByStatusTenant",
  service: BookingRequestService,
  requestStream: false,
  responseStream: true,
  requestType: booking_request_pb.BookingRequestStatusMessage,
  responseType: booking_request_pb.BookingRequestMessage
};

BookingRequestService.GetRequestsByStatusLandlord = {
  methodName: "GetRequestsByStatusLandlord",
  service: BookingRequestService,
  requestStream: false,
  responseStream: true,
  requestType: booking_request_pb.BookingRequestStatusMessage,
  responseType: booking_request_pb.BookingRequestMessage
};

BookingRequestService.AcceptBookingRequest = {
  methodName: "AcceptBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.BookingRequestIdMessage,
  responseType: booking_request_pb.ChangeRequestStatusResponse
};

BookingRequestService.DenyBookingRequest = {
  methodName: "DenyBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.BookingRequestIdMessage,
  responseType: booking_request_pb.ChangeRequestStatusResponse
};

BookingRequestService.PayBookingRequest = {
  methodName: "PayBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.BookingRequestIdMessage,
  responseType: booking_request_pb.ChangeRequestStatusResponse
};

BookingRequestService.FinishBookingRequest = {
  methodName: "FinishBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.BookingRequestIdMessage,
  responseType: booking_request_pb.ChangeRequestStatusResponse
};

BookingRequestService.CancelBookingRequest = {
  methodName: "CancelBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.BookingRequestIdMessage,
  responseType: booking_request_pb.ChangeRequestStatusResponse
};

BookingRequestService.CreateBookingRequest = {
  methodName: "CreateBookingRequest",
  service: BookingRequestService,
  requestStream: false,
  responseStream: false,
  requestType: booking_request_pb.CreateBookingRequestMessage,
  responseType: booking_request_pb.CreateBookingRequestResponse
};

exports.BookingRequestService = BookingRequestService;

function BookingRequestServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BookingRequestServiceClient.prototype.checkAvailability = function checkAvailability(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.CheckAvailability, {
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

BookingRequestServiceClient.prototype.getRequestsByStatusTenant = function getRequestsByStatusTenant(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(BookingRequestService.GetRequestsByStatusTenant, {
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

BookingRequestServiceClient.prototype.getRequestsByStatusLandlord = function getRequestsByStatusLandlord(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(BookingRequestService.GetRequestsByStatusLandlord, {
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

BookingRequestServiceClient.prototype.acceptBookingRequest = function acceptBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.AcceptBookingRequest, {
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

BookingRequestServiceClient.prototype.denyBookingRequest = function denyBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.DenyBookingRequest, {
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

BookingRequestServiceClient.prototype.payBookingRequest = function payBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.PayBookingRequest, {
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

BookingRequestServiceClient.prototype.finishBookingRequest = function finishBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.FinishBookingRequest, {
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

BookingRequestServiceClient.prototype.cancelBookingRequest = function cancelBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.CancelBookingRequest, {
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

BookingRequestServiceClient.prototype.createBookingRequest = function createBookingRequest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BookingRequestService.CreateBookingRequest, {
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

exports.BookingRequestServiceClient = BookingRequestServiceClient;

