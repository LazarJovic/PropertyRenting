// package: 
// file: ad.proto

import * as ad_pb from "./ad_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AdServiceCreateAd = {
  readonly methodName: string;
  readonly service: typeof AdService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof ad_pb.AdMessage;
  readonly responseType: typeof ad_pb.CreateAdResponse;
};

type AdServiceSearchAds = {
  readonly methodName: string;
  readonly service: typeof AdService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof ad_pb.SearchAdMessage;
  readonly responseType: typeof ad_pb.SearchAdResultMessage;
};

export class AdService {
  static readonly serviceName: string;
  static readonly CreateAd: AdServiceCreateAd;
  static readonly SearchAds: AdServiceSearchAds;
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

export class AdServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createAd(
    requestMessage: ad_pb.AdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: ad_pb.CreateAdResponse|null) => void
  ): UnaryResponse;
  createAd(
    requestMessage: ad_pb.AdMessage,
    callback: (error: ServiceError|null, responseMessage: ad_pb.CreateAdResponse|null) => void
  ): UnaryResponse;
  searchAds(requestMessage: ad_pb.SearchAdMessage, metadata?: grpc.Metadata): ResponseStream<ad_pb.SearchAdResultMessage>;
}

