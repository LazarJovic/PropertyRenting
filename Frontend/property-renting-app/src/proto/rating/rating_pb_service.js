// package: 
// file: rating.proto

var rating_pb = require("./rating_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AdRatingService = (function () {
  function AdRatingService() {}
  AdRatingService.serviceName = "AdRatingService";
  return AdRatingService;
}());

AdRatingService.RateAd = {
  methodName: "RateAd",
  service: AdRatingService,
  requestStream: false,
  responseStream: false,
  requestType: rating_pb.AdRatingMessage,
  responseType: rating_pb.RateAdResponseMessage
};

exports.AdRatingService = AdRatingService;

function AdRatingServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AdRatingServiceClient.prototype.rateAd = function rateAd(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AdRatingService.RateAd, {
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

exports.AdRatingServiceClient = AdRatingServiceClient;

