// package: 
// file: ad.proto

import * as jspb from "google-protobuf";
import * as property_type_pb from "../property-type/property_type_pb";

export class AdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getPropertyId(): number;
  setPropertyId(value: number): void;

  getDurationLimited(): boolean;
  setDurationLimited(value: boolean): void;

  getStartDate(): string;
  setStartDate(value: string): void;

  getEndDate(): string;
  setEndDate(value: string): void;

  getGuestPreference(): string;
  setGuestPreference(value: string): void;

  getPricePerNight(): number;
  setPricePerNight(value: number): void;

  getSecurityDeposit(): number;
  setSecurityDeposit(value: number): void;

  getAdditionalInfo(): string;
  setAdditionalInfo(value: string): void;

  clearImagesList(): void;
  getImagesList(): Array<AdImageMessage>;
  setImagesList(value: Array<AdImageMessage>): void;
  addImages(value?: AdImageMessage, index?: number): AdImageMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AdMessage): AdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdMessage;
  static deserializeBinaryFromReader(message: AdMessage, reader: jspb.BinaryReader): AdMessage;
}

export namespace AdMessage {
  export type AsObject = {
    id: number,
    propertyId: number,
    durationLimited: boolean,
    startDate: string,
    endDate: string,
    guestPreference: string,
    pricePerNight: number,
    securityDeposit: number,
    additionalInfo: string,
    imagesList: Array<AdImageMessage.AsObject>,
  }
}

export class AdImageMessage extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getType(): string;
  setType(value: string): void;

  getPicByte(): Uint8Array | string;
  getPicByte_asU8(): Uint8Array;
  getPicByte_asB64(): string;
  setPicByte(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdImageMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AdImageMessage): AdImageMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdImageMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdImageMessage;
  static deserializeBinaryFromReader(message: AdImageMessage, reader: jspb.BinaryReader): AdImageMessage;
}

export namespace AdImageMessage {
  export type AsObject = {
    name: string,
    type: string,
    picByte: Uint8Array | string,
  }
}

export class CreateAdResponse extends jspb.Message {
  hasAd(): boolean;
  clearAd(): void;
  getAd(): AdMessage | undefined;
  setAd(value?: AdMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAdResponse): CreateAdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAdResponse;
  static deserializeBinaryFromReader(message: CreateAdResponse, reader: jspb.BinaryReader): CreateAdResponse;
}

export namespace CreateAdResponse {
  export type AsObject = {
    ad?: AdMessage.AsObject,
    returnMessage: string,
  }
}

