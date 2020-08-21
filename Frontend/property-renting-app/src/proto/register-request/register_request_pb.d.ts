// package: 
// file: register_request.proto

import * as jspb from "google-protobuf";

export class RegisterRequestMessage extends jspb.Message {
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

  getPassword(): string;
  setPassword(value: string): void;

  getConfirmPassword(): string;
  setConfirmPassword(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getPostcode(): string;
  setPostcode(value: string): void;

  getIsLandlord(): boolean;
  setIsLandlord(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequestMessage): RegisterRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequestMessage;
  static deserializeBinaryFromReader(message: RegisterRequestMessage, reader: jspb.BinaryReader): RegisterRequestMessage;
}

export namespace RegisterRequestMessage {
  export type AsObject = {
    id: number,
    firstName: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    country: string,
    city: string,
    address: string,
    postcode: string,
    isLandlord: boolean,
  }
}

export class CreateRegisterRequestResponse extends jspb.Message {
  hasRegisterRequest(): boolean;
  clearRegisterRequest(): void;
  getRegisterRequest(): RegisterRequestMessage | undefined;
  setRegisterRequest(value?: RegisterRequestMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRegisterRequestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRegisterRequestResponse): CreateRegisterRequestResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateRegisterRequestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRegisterRequestResponse;
  static deserializeBinaryFromReader(message: CreateRegisterRequestResponse, reader: jspb.BinaryReader): CreateRegisterRequestResponse;
}

export namespace CreateRegisterRequestResponse {
  export type AsObject = {
    registerRequest?: RegisterRequestMessage.AsObject,
    returnMessage: string,
  }
}

export class EmailVerificationMessage extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailVerificationMessage.AsObject;
  static toObject(includeInstance: boolean, msg: EmailVerificationMessage): EmailVerificationMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailVerificationMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailVerificationMessage;
  static deserializeBinaryFromReader(message: EmailVerificationMessage, reader: jspb.BinaryReader): EmailVerificationMessage;
}

export namespace EmailVerificationMessage {
  export type AsObject = {
    email: string,
    token: string,
  }
}

export class EmailVerificationResponse extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailVerificationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EmailVerificationResponse): EmailVerificationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmailVerificationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailVerificationResponse;
  static deserializeBinaryFromReader(message: EmailVerificationResponse, reader: jspb.BinaryReader): EmailVerificationResponse;
}

export namespace EmailVerificationResponse {
  export type AsObject = {
    email: string,
    returnMessage: string,
  }
}

