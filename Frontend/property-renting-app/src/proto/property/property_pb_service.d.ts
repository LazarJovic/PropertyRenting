// package: 
// file: property.proto

import * as property_pb from "./property_pb";
import * as property_type_pb from "../property-type/property_type_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PropertyServiceRegisterProperty = {
  readonly methodName: string;
  readonly service: typeof PropertyService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof property_pb.PropertyMessage;
  readonly responseType: typeof property_pb.RegisterPropertyResponse;
};

type PropertyServiceGetMyProperties = {
  readonly methodName: string;
  readonly service: typeof PropertyService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof property_type_pb.EmptyMessage;
  readonly responseType: typeof property_pb.PropertyMessage;
};

type PropertyServiceDeleteProperty = {
  readonly methodName: string;
  readonly service: typeof PropertyService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof property_pb.PropertyIdMessage;
  readonly responseType: typeof property_pb.DeletePropertyResponse;
};

export class PropertyService {
  static readonly serviceName: string;
  static readonly RegisterProperty: PropertyServiceRegisterProperty;
  static readonly GetMyProperties: PropertyServiceGetMyProperties;
  static readonly DeleteProperty: PropertyServiceDeleteProperty;
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

export class PropertyServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  registerProperty(
    requestMessage: property_pb.PropertyMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: property_pb.RegisterPropertyResponse|null) => void
  ): UnaryResponse;
  registerProperty(
    requestMessage: property_pb.PropertyMessage,
    callback: (error: ServiceError|null, responseMessage: property_pb.RegisterPropertyResponse|null) => void
  ): UnaryResponse;
  getMyProperties(requestMessage: property_type_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<property_pb.PropertyMessage>;
  deleteProperty(
    requestMessage: property_pb.PropertyIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: property_pb.DeletePropertyResponse|null) => void
  ): UnaryResponse;
  deleteProperty(
    requestMessage: property_pb.PropertyIdMessage,
    callback: (error: ServiceError|null, responseMessage: property_pb.DeletePropertyResponse|null) => void
  ): UnaryResponse;
}

