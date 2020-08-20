// package: 
// file: register_request.proto

import * as register_request_pb from "./register_request_pb";
import {grpc} from "@improbable-eng/grpc-web";

type RegisterRequestServiceCreateRegisterRequest = {
  readonly methodName: string;
  readonly service: typeof RegisterRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof register_request_pb.RegisterRequestMessage;
  readonly responseType: typeof register_request_pb.CreateRegisterRequestResponse;
};

export class RegisterRequestService {
  static readonly serviceName: string;
  static readonly CreateRegisterRequest: RegisterRequestServiceCreateRegisterRequest;
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

export class RegisterRequestServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createRegisterRequest(
    requestMessage: register_request_pb.RegisterRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: register_request_pb.CreateRegisterRequestResponse|null) => void
  ): UnaryResponse;
  createRegisterRequest(
    requestMessage: register_request_pb.RegisterRequestMessage,
    callback: (error: ServiceError|null, responseMessage: register_request_pb.CreateRegisterRequestResponse|null) => void
  ): UnaryResponse;
}

