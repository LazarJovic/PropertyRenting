// package: 
// file: property_type.proto

import * as property_type_pb from "./property_type_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PropertyTypeServiceCreatePropertyType = {
  readonly methodName: string;
  readonly service: typeof PropertyTypeService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof property_type_pb.PropertyTypeMessage;
  readonly responseType: typeof property_type_pb.CreatePropertyTypeResponse;
};

export class PropertyTypeService {
  static readonly serviceName: string;
  static readonly CreatePropertyType: PropertyTypeServiceCreatePropertyType;
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

export class PropertyTypeServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createPropertyType(
    requestMessage: property_type_pb.PropertyTypeMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: property_type_pb.CreatePropertyTypeResponse|null) => void
  ): UnaryResponse;
  createPropertyType(
    requestMessage: property_type_pb.PropertyTypeMessage,
    callback: (error: ServiceError|null, responseMessage: property_type_pb.CreatePropertyTypeResponse|null) => void
  ): UnaryResponse;
}

