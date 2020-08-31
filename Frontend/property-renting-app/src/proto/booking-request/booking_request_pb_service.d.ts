// package: 
// file: booking_request.proto

import * as booking_request_pb from "./booking_request_pb";
import {grpc} from "@improbable-eng/grpc-web";

type BookingRequestServiceCheckAvailability = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.CheckAvailabilityMessage;
  readonly responseType: typeof booking_request_pb.CheckAvailabilityResponse;
};

type BookingRequestServiceGetRequestsByStatus = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof booking_request_pb.BookingRequestStatusMessage;
  readonly responseType: typeof booking_request_pb.BookingRequestMessage;
};

type BookingRequestServiceAcceptBookingRequest = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.BookingRequestIdMessage;
  readonly responseType: typeof booking_request_pb.ChangeRequestStatusResponse;
};

type BookingRequestServiceDenyBookingRequest = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.BookingRequestIdMessage;
  readonly responseType: typeof booking_request_pb.ChangeRequestStatusResponse;
};

type BookingRequestServicePayBookingRequest = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.BookingRequestIdMessage;
  readonly responseType: typeof booking_request_pb.ChangeRequestStatusResponse;
};

type BookingRequestServiceFinishBookingRequest = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.BookingRequestIdMessage;
  readonly responseType: typeof booking_request_pb.ChangeRequestStatusResponse;
};

type BookingRequestServiceCancelBookingRequest = {
  readonly methodName: string;
  readonly service: typeof BookingRequestService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof booking_request_pb.BookingRequestIdMessage;
  readonly responseType: typeof booking_request_pb.ChangeRequestStatusResponse;
};

export class BookingRequestService {
  static readonly serviceName: string;
  static readonly CheckAvailability: BookingRequestServiceCheckAvailability;
  static readonly GetRequestsByStatus: BookingRequestServiceGetRequestsByStatus;
  static readonly AcceptBookingRequest: BookingRequestServiceAcceptBookingRequest;
  static readonly DenyBookingRequest: BookingRequestServiceDenyBookingRequest;
  static readonly PayBookingRequest: BookingRequestServicePayBookingRequest;
  static readonly FinishBookingRequest: BookingRequestServiceFinishBookingRequest;
  static readonly CancelBookingRequest: BookingRequestServiceCancelBookingRequest;
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

export class BookingRequestServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  checkAvailability(
    requestMessage: booking_request_pb.CheckAvailabilityMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.CheckAvailabilityResponse|null) => void
  ): UnaryResponse;
  checkAvailability(
    requestMessage: booking_request_pb.CheckAvailabilityMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.CheckAvailabilityResponse|null) => void
  ): UnaryResponse;
  getRequestsByStatus(requestMessage: booking_request_pb.BookingRequestStatusMessage, metadata?: grpc.Metadata): ResponseStream<booking_request_pb.BookingRequestMessage>;
  acceptBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  acceptBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  denyBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  denyBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  payBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  payBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  finishBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  finishBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  cancelBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
  cancelBookingRequest(
    requestMessage: booking_request_pb.BookingRequestIdMessage,
    callback: (error: ServiceError|null, responseMessage: booking_request_pb.ChangeRequestStatusResponse|null) => void
  ): UnaryResponse;
}

