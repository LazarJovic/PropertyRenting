// package: 
// file: user.proto

import * as jspb from "google-protobuf";
import * as property_type_pb from "../property-type/property_type_pb";

export class CreateClientMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFirstName(): string;
  setFirstName(value: string): void;

  getSurname(): string;
  setSurname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getIsLandlord(): boolean;
  setIsLandlord(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateClientMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CreateClientMessage): CreateClientMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateClientMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateClientMessage;
  static deserializeBinaryFromReader(message: CreateClientMessage, reader: jspb.BinaryReader): CreateClientMessage;
}

export namespace CreateClientMessage {
  export type AsObject = {
    id: number,
    firstName: string,
    surname: string,
    email: string,
    isLandlord: boolean,
  }
}

export class GetByRoleMessage extends jspb.Message {
  getRole(): string;
  setRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByRoleMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GetByRoleMessage): GetByRoleMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetByRoleMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByRoleMessage;
  static deserializeBinaryFromReader(message: GetByRoleMessage, reader: jspb.BinaryReader): GetByRoleMessage;
}

export namespace GetByRoleMessage {
  export type AsObject = {
    role: string,
  }
}

export class UserMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getFirstName(): string;
  setFirstName(value: string): void;

  getSurname(): string;
  setSurname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getAccountBlocked(): boolean;
  setAccountBlocked(value: boolean): void;

  getRole(): string;
  setRole(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UserMessage): UserMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserMessage;
  static deserializeBinaryFromReader(message: UserMessage, reader: jspb.BinaryReader): UserMessage;
}

export namespace UserMessage {
  export type AsObject = {
    id: number,
    firstName: string,
    surname: string,
    email: string,
    phone: string,
    accountBlocked: boolean,
    role: string,
  }
}

export class UserIdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserIdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UserIdMessage): UserIdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserIdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserIdMessage;
  static deserializeBinaryFromReader(message: UserIdMessage, reader: jspb.BinaryReader): UserIdMessage;
}

export namespace UserIdMessage {
  export type AsObject = {
    id: number,
  }
}

