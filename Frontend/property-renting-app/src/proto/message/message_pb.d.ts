// package: 
// file: message.proto

import * as jspb from "google-protobuf";

export class CreateMessageRequest extends jspb.Message {
  getRequestId(): number;
  setRequestId(value: number): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageRequest): CreateMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageRequest;
  static deserializeBinaryFromReader(message: CreateMessageRequest, reader: jspb.BinaryReader): CreateMessageRequest;
}

export namespace CreateMessageRequest {
  export type AsObject = {
    requestId: number,
    content: string,
  }
}

export class MessageMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getContent(): string;
  setContent(value: string): void;

  getSenderName(): string;
  setSenderName(value: string): void;

  getSenderSurname(): string;
  setSenderSurname(value: string): void;

  getSenderEmail(): string;
  setSenderEmail(value: string): void;

  getIsTenantSender(): boolean;
  setIsTenantSender(value: boolean): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  getBookingId(): number;
  setBookingId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageMessage.AsObject;
  static toObject(includeInstance: boolean, msg: MessageMessage): MessageMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageMessage;
  static deserializeBinaryFromReader(message: MessageMessage, reader: jspb.BinaryReader): MessageMessage;
}

export namespace MessageMessage {
  export type AsObject = {
    id: number,
    content: string,
    senderName: string,
    senderSurname: string,
    senderEmail: string,
    isTenantSender: boolean,
    timestamp: string,
    bookingId: number,
  }
}

export class CreateMessageResponse extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): MessageMessage | undefined;
  setMessage(value?: MessageMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageResponse): CreateMessageResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageResponse;
  static deserializeBinaryFromReader(message: CreateMessageResponse, reader: jspb.BinaryReader): CreateMessageResponse;
}

export namespace CreateMessageResponse {
  export type AsObject = {
    message?: MessageMessage.AsObject,
    returnMessage: string,
  }
}

export class GetRequestMessages extends jspb.Message {
  getBookingId(): number;
  setBookingId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequestMessages.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequestMessages): GetRequestMessages.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRequestMessages, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequestMessages;
  static deserializeBinaryFromReader(message: GetRequestMessages, reader: jspb.BinaryReader): GetRequestMessages;
}

export namespace GetRequestMessages {
  export type AsObject = {
    bookingId: number,
  }
}

