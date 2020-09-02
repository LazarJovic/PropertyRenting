// package: 
// file: comment.proto

import * as jspb from "google-protobuf";
import * as property_type_pb from "../property-type/property_type_pb";

export class CommentMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFirstName(): string;
  setFirstName(value: string): void;

  getSurname(): string;
  setSurname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CommentMessage): CommentMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommentMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentMessage;
  static deserializeBinaryFromReader(message: CommentMessage, reader: jspb.BinaryReader): CommentMessage;
}

export namespace CommentMessage {
  export type AsObject = {
    id: number,
    firstName: string,
    surname: string,
    email: string,
    timestamp: string,
    content: string,
  }
}

export class CommentIdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommentIdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CommentIdMessage): CommentIdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommentIdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommentIdMessage;
  static deserializeBinaryFromReader(message: CommentIdMessage, reader: jspb.BinaryReader): CommentIdMessage;
}

export namespace CommentIdMessage {
  export type AsObject = {
    id: number,
  }
}

export class CreateCommentMessage extends jspb.Message {
  getContent(): string;
  setContent(value: string): void;

  getRequestId(): number;
  setRequestId(value: number): void;

  getAdId(): number;
  setAdId(value: number): void;

  getPropertyId(): number;
  setPropertyId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCommentMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCommentMessage): CreateCommentMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCommentMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCommentMessage;
  static deserializeBinaryFromReader(message: CreateCommentMessage, reader: jspb.BinaryReader): CreateCommentMessage;
}

export namespace CreateCommentMessage {
  export type AsObject = {
    content: string,
    requestId: number,
    adId: number,
    propertyId: number,
  }
}

export class PropertyIdCommentsMessage extends jspb.Message {
  getPropertyId(): number;
  setPropertyId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyIdCommentsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyIdCommentsMessage): PropertyIdCommentsMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyIdCommentsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyIdCommentsMessage;
  static deserializeBinaryFromReader(message: PropertyIdCommentsMessage, reader: jspb.BinaryReader): PropertyIdCommentsMessage;
}

export namespace PropertyIdCommentsMessage {
  export type AsObject = {
    propertyId: number,
  }
}

export class CreateCommentMessageResponse extends jspb.Message {
  hasComment(): boolean;
  clearComment(): void;
  getComment(): CommentMessage | undefined;
  setComment(value?: CommentMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCommentMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCommentMessageResponse): CreateCommentMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCommentMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCommentMessageResponse;
  static deserializeBinaryFromReader(message: CreateCommentMessageResponse, reader: jspb.BinaryReader): CreateCommentMessageResponse;
}

export namespace CreateCommentMessageResponse {
  export type AsObject = {
    comment?: CommentMessage.AsObject,
    returnMessage: string,
  }
}

