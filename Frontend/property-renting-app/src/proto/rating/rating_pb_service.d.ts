// package: 
// file: rating.proto

import * as rating_pb from "./rating_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AdRatingServiceRateAd = {
  readonly methodName: string;
  readonly service: typeof AdRatingService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rating_pb.AdRatingMessage;
  readonly responseType: typeof rating_pb.RateAdResponseMessage;
};

export class AdRatingService {
  static readonly serviceName: string;
  static readonly RateAd: AdRatingServiceRateAd;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AdRatingServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  rateAd(
    requestMessage: rating_pb.AdRatingMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rating_pb.RateAdResponseMessage|null) => void
  ): UnaryResponse;
  rateAd(
    requestMessage: rating_pb.AdRatingMessage,
    callback: (error: ServiceError|null, responseMessage: rating_pb.RateAdResponseMessage|null) => void
  ): UnaryResponse;
}

