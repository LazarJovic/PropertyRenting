// package: 
// file: ad.proto

var ad_pb = require("./ad_pb");
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

exports.AdServiceClient = AdServiceClient;

