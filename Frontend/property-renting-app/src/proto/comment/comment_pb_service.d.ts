// package: 
// file: comment.proto

import * as comment_pb from "./comment_pb";
import * as property_type_pb from "../property-type/property_type_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CommentServiceGetAllPendingComments = {
  readonly methodName: string;
  readonly service: typeof CommentService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof property_type_pb.EmptyMessage;
  readonly responseType: typeof comment_pb.CommentMessage;
};

type CommentServiceAcceptComment = {
  readonly methodName: string;
  readonly service: typeof CommentService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof comment_pb.CommentIdMessage;
  readonly responseType: typeof comment_pb.CommentMessage;
};

type CommentServiceDenyComment = {
  readonly methodName: string;
  readonly service: typeof CommentService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof comment_pb.CommentIdMessage;
  readonly responseType: typeof comment_pb.CommentMessage;
};

type CommentServiceGetAllPropertyComments = {
  readonly methodName: string;
  readonly service: typeof CommentService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof comment_pb.PropertyIdCommentsMessage;
  readonly responseType: typeof comment_pb.CommentMessage;
};

type CommentServiceCreateComment = {
  readonly methodName: string;
  readonly service: typeof CommentService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof comment_pb.CreateCommentMessage;
  readonly responseType: typeof comment_pb.CreateCommentMessageResponse;
};

export class CommentService {
  static readonly serviceName: string;
  static readonly GetAllPendingComments: CommentServiceGetAllPendingComments;
  static readonly AcceptComment: CommentServiceAcceptComment;
  static readonly DenyComment: CommentServiceDenyComment;
  static readonly GetAllPropertyComments: CommentServiceGetAllPropertyComments;
  static readonly CreateComment: CommentServiceCreateComment;
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

export class CommentServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAllPendingComments(requestMessage: property_type_pb.EmptyMessage, metadata?: grpc.Metadata): ResponseStream<comment_pb.CommentMessage>;
  acceptComment(
    requestMessage: comment_pb.CommentIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CommentMessage|null) => void
  ): UnaryResponse;
  acceptComment(
    requestMessage: comment_pb.CommentIdMessage,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CommentMessage|null) => void
  ): UnaryResponse;
  denyComment(
    requestMessage: comment_pb.CommentIdMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CommentMessage|null) => void
  ): UnaryResponse;
  denyComment(
    requestMessage: comment_pb.CommentIdMessage,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CommentMessage|null) => void
  ): UnaryResponse;
  getAllPropertyComments(requestMessage: comment_pb.PropertyIdCommentsMessage, metadata?: grpc.Metadata): ResponseStream<comment_pb.CommentMessage>;
  createComment(
    requestMessage: comment_pb.CreateCommentMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CreateCommentMessageResponse|null) => void
  ): UnaryResponse;
  createComment(
    requestMessage: comment_pb.CreateCommentMessage,
    callback: (error: ServiceError|null, responseMessage: comment_pb.CreateCommentMessageResponse|null) => void
  ): UnaryResponse;
}

