// package: 
// file: auth.proto

import * as jspb from "google-protobuf";

export class LoginMessage extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginMessage.AsObject;
  static toObject(includeInstance: boolean, msg: LoginMessage): LoginMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginMessage;
  static deserializeBinaryFromReader(message: LoginMessage, reader: jspb.BinaryReader): LoginMessage;
}

export namespace LoginMessage {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class UserWithTokenMessage extends jspb.Message {
  getAccessToken(): string;
  setAccessToken(value: string): void;

  getExpiresIn(): number;
  setExpiresIn(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getRole(): string;
  setRole(value: string): void;

  getValid(): boolean;
  setValid(value: boolean): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserWithTokenMessage.AsObject;
  static toObject(includeInstance: boolean, msg: UserWithTokenMessage): UserWithTokenMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserWithTokenMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserWithTokenMessage;
  static deserializeBinaryFromReader(message: UserWithTokenMessage, reader: jspb.BinaryReader): UserWithTokenMessage;
}

export namespace UserWithTokenMessage {
  export type AsObject = {
    accessToken: string,
    expiresIn: number,
    userId: number,
    role: string,
    valid: boolean,
    returnMessage: string,
  }
}

