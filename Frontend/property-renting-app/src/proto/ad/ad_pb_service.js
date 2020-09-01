// package: 
// file: ad.proto

var ad_pb = require("./ad_pb");
var property_type_pb = require("../property-type/property_type_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AdService = (function () {
  function AdService() {}
  AdService.serviceName = "AdService";
  return AdService;
}());

AdService.CreateAd = {
  methodName: "CreateAd",
  service: AdService,
  requestStream: false,
  responseStream: false,
  requestType: ad_pb.AdMessage,
  responseType: ad_pb.CreateAdResponse
};

AdService.SearchAds = {
  methodName: "SearchAds",
  service: AdService,
  requestStream: false,
  responseStream: true,
  requestType: ad_pb.SearchAdMessage,
  responseType: ad_pb.SearchAdResultMessage
};

AdService.GetAdDetails = {
  methodName: "GetAdDetails",
  service: AdService,
  requestStream: false,
  responseStream: false,
  requestType: ad_pb.AdIdMessage,
  responseType: ad_pb.AdDetailsMessage
};

AdService.GetAdImages = {
  methodName: "GetAdImages",
  service: AdService,
  requestStream: false,
  responseStream: true,
  requestType: ad_pb.AdIdMessage,
  responseType: ad_pb.AdImageMessage
};

AdService.GetMyActiveAds = {
  methodName: "GetMyActiveAds",
  service: AdService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: ad_pb.MyAdMessage
};

AdService.GetMyInactiveAds = {
  methodName: "GetMyInactiveAds",
  service: AdService,
  requestStream: false,
  responseStream: true,
  requestType: property_type_pb.EmptyMessage,
  responseType: ad_pb.MyAdMessage
};

AdService.DeleteAd = {
  methodName: "DeleteAd",
  service: AdService,
  requestStream: false,
  responseStream: false,
  requestType: ad_pb.AdIdMessage,
  responseType: ad_pb.DeleteAdResponse
};

exports.AdService = AdService;

function AdServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AdServiceClient.prototype.createAd = function createAd(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AdService.CreateAd, {
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

AdServiceClient.prototype.searchAds = function searchAds(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AdService.SearchAds, {
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

AdServiceClient.prototype.getAdDetails = function getAdDetails(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AdService.GetAdDetails, {
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

AdServiceClient.prototype.getAdImages = function getAdImages(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AdService.GetAdImages, {
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

AdServiceClient.prototype.getMyActiveAds = function getMyActiveAds(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AdService.GetMyActiveAds, {
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

AdServiceClient.prototype.getMyInactiveAds = function getMyInactiveAds(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AdService.GetMyInactiveAds, {
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

AdServiceClient.prototype.deleteAd = function deleteAd(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AdService.DeleteAd, {
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

exports.AdServiceClient = AdServiceClient;

