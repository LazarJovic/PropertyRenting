// package: 
// file: property_type.proto

import * as jspb from "google-protobuf";

export class PropertyTypeMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyTypeMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyTypeMessage): PropertyTypeMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyTypeMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyTypeMessage;
  static deserializeBinaryFromReader(message: PropertyTypeMessage, reader: jspb.BinaryReader): PropertyTypeMessage;
}

export namespace PropertyTypeMessage {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
  }
}

export class CreatePropertyTypeResponse extends jspb.Message {
  hasPropertytype(): boolean;
  clearPropertytype(): void;
  getPropertytype(): PropertyTypeMessage | undefined;
  setPropertytype(value?: PropertyTypeMessage): void;

  getReturnmessage(): string;
  setReturnmessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatePropertyTypeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreatePropertyTypeResponse): CreatePropertyTypeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreatePropertyTypeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatePropertyTypeResponse;
  static deserializeBinaryFromReader(message: CreatePropertyTypeResponse, reader: jspb.BinaryReader): CreatePropertyTypeResponse;
}

export namespace CreatePropertyTypeResponse {
  export type AsObject = {
    propertytype?: PropertyTypeMessage.AsObject,
    returnmessage: string,
  }
}

