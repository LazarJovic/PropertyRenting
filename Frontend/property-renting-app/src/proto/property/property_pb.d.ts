// package: 
// file: property.proto

import * as jspb from "google-protobuf";
import * as property_type_pb from "../property-type/property_type_pb";

export class PropertyMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTypeId(): number;
  setTypeId(value: number): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getFurnished(): boolean;
  setFurnished(value: boolean): void;

  getNumberOfRooms(): number;
  setNumberOfRooms(value: number): void;

  getDistanceFromCenter(): number;
  setDistanceFromCenter(value: number): void;

  getInternetIncluded(): boolean;
  setInternetIncluded(value: boolean): void;

  getAirConditionIncluded(): boolean;
  setAirConditionIncluded(value: boolean): void;

  getAverageRating(): number;
  setAverageRating(value: number): void;

  hasImage(): boolean;
  clearImage(): void;
  getImage(): PropertyImageMessage | undefined;
  setImage(value?: PropertyImageMessage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyMessage): PropertyMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyMessage;
  static deserializeBinaryFromReader(message: PropertyMessage, reader: jspb.BinaryReader): PropertyMessage;
}

export namespace PropertyMessage {
  export type AsObject = {
    id: number,
    typeId: number,
    country: string,
    city: string,
    address: string,
    size: number,
    furnished: boolean,
    numberOfRooms: number,
    distanceFromCenter: number,
    internetIncluded: boolean,
    airConditionIncluded: boolean,
    averageRating: number,
    image?: PropertyImageMessage.AsObject,
  }
}

export class PropertyImageMessage extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getPicByte(): Uint8Array | string;
  getPicByte_asU8(): Uint8Array;
  getPicByte_asB64(): string;
  setPicByte(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyImageMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyImageMessage): PropertyImageMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyImageMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyImageMessage;
  static deserializeBinaryFromReader(message: PropertyImageMessage, reader: jspb.BinaryReader): PropertyImageMessage;
}

export namespace PropertyImageMessage {
  export type AsObject = {
    name: string,
    type: string,
    picByte: Uint8Array | string,
  }
}

export class RegisterPropertyResponse extends jspb.Message {
  hasProperty(): boolean;
  clearProperty(): void;
  getProperty(): PropertyMessage | undefined;
  setProperty(value?: PropertyMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterPropertyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterPropertyResponse): RegisterPropertyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterPropertyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterPropertyResponse;
  static deserializeBinaryFromReader(message: RegisterPropertyResponse, reader: jspb.BinaryReader): RegisterPropertyResponse;
}

export namespace RegisterPropertyResponse {
  export type AsObject = {
    property?: PropertyMessage.AsObject,
    returnMessage: string,
  }
}

export class PropertyIdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyIdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyIdMessage): PropertyIdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyIdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyIdMessage;
  static deserializeBinaryFromReader(message: PropertyIdMessage, reader: jspb.BinaryReader): PropertyIdMessage;
}

export namespace PropertyIdMessage {
  export type AsObject = {
    id: number,
  }
}

export class DeletePropertyResponse extends jspb.Message {
  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeletePropertyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeletePropertyResponse): DeletePropertyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeletePropertyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeletePropertyResponse;
  static deserializeBinaryFromReader(message: DeletePropertyResponse, reader: jspb.BinaryReader): DeletePropertyResponse;
}

export namespace DeletePropertyResponse {
  export type AsObject = {
    returnMessage: string,
  }
}

export class PropertyStatsMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPosition(): number;
  setPosition(value: number): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getType(): string;
  setType(value: string): void;

  getNumberOfBookings(): number;
  setNumberOfBookings(value: number): void;

  getAverageRating(): number;
  setAverageRating(value: number): void;

  hasImage(): boolean;
  clearImage(): void;
  getImage(): PropertyImageMessage | undefined;
  setImage(value?: PropertyImageMessage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyStatsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyStatsMessage): PropertyStatsMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PropertyStatsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyStatsMessage;
  static deserializeBinaryFromReader(message: PropertyStatsMessage, reader: jspb.BinaryReader): PropertyStatsMessage;
}

export namespace PropertyStatsMessage {
  export type AsObject = {
    id: number,
    position: number,
    country: string,
    city: string,
    address: string,
    type: string,
    numberOfBookings: number,
    averageRating: number,
    image?: PropertyImageMessage.AsObject,
  }
}

