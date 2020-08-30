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

