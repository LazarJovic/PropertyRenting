// package: 
// file: ad.proto

import * as jspb from "google-protobuf";

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

export class SearchAdMessage extends jspb.Message {
  getStartDate(): string;
  setStartDate(value: string): void;

  getEndDate(): string;
  setEndDate(value: string): void;

  getType(): string;
  setType(value: string): void;

  getGuestPreference(): string;
  setGuestPreference(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getSizeMin(): number;
  setSizeMin(value: number): void;

  getSizeMax(): number;
  setSizeMax(value: number): void;

  getNumberOfRoomsMin(): number;
  setNumberOfRoomsMin(value: number): void;

  getNumberOfRoomsMax(): number;
  setNumberOfRoomsMax(value: number): void;

  getDistanceFromCenterMin(): number;
  setDistanceFromCenterMin(value: number): void;

  getDistanceFromCenterMax(): number;
  setDistanceFromCenterMax(value: number): void;

  getPriceMin(): number;
  setPriceMin(value: number): void;

  getPriceMax(): number;
  setPriceMax(value: number): void;

  getFurnished(): boolean;
  setFurnished(value: boolean): void;

  getInternetIncluded(): boolean;
  setInternetIncluded(value: boolean): void;

  getAirConditionIncluded(): boolean;
  setAirConditionIncluded(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchAdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SearchAdMessage): SearchAdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchAdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchAdMessage;
  static deserializeBinaryFromReader(message: SearchAdMessage, reader: jspb.BinaryReader): SearchAdMessage;
}

export namespace SearchAdMessage {
  export type AsObject = {
    startDate: string,
    endDate: string,
    type: string,
    guestPreference: string,
    country: string,
    city: string,
    address: string,
    sizeMin: number,
    sizeMax: number,
    numberOfRoomsMin: number,
    numberOfRoomsMax: number,
    distanceFromCenterMin: number,
    distanceFromCenterMax: number,
    priceMin: number,
    priceMax: number,
    furnished: boolean,
    internetIncluded: boolean,
    airConditionIncluded: boolean,
  }
}

export class SearchAdResultMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getStartDate(): string;
  setStartDate(value: string): void;

  getEndDate(): string;
  setEndDate(value: string): void;

  getType(): string;
  setType(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getSecurityDeposit(): number;
  setSecurityDeposit(value: number): void;

  getPrice(): number;
  setPrice(value: number): void;

  hasImage(): boolean;
  clearImage(): void;
  getImage(): AdImageMessage | undefined;
  setImage(value?: AdImageMessage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchAdResultMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SearchAdResultMessage): SearchAdResultMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchAdResultMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchAdResultMessage;
  static deserializeBinaryFromReader(message: SearchAdResultMessage, reader: jspb.BinaryReader): SearchAdResultMessage;
}

export namespace SearchAdResultMessage {
  export type AsObject = {
    id: number,
    startDate: string,
    endDate: string,
    type: string,
    country: string,
    city: string,
    address: string,
    securityDeposit: number,
    price: number,
    image?: AdImageMessage.AsObject,
  }
}

export class AdIdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdIdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AdIdMessage): AdIdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdIdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdIdMessage;
  static deserializeBinaryFromReader(message: AdIdMessage, reader: jspb.BinaryReader): AdIdMessage;
}

export namespace AdIdMessage {
  export type AsObject = {
    id: number,
  }
}

export class AdDetailsMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getStartDate(): string;
  setStartDate(value: string): void;

  getEndDate(): string;
  setEndDate(value: string): void;

  getPostingDate(): string;
  setPostingDate(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getSecurityDeposit(): number;
  setSecurityDeposit(value: number): void;

  getGuestPreference(): string;
  setGuestPreference(value: string): void;

  getAdditionalInfo(): string;
  setAdditionalInfo(value: string): void;

  getType(): string;
  setType(value: string): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getSize(): number;
  setSize(value: number): void;

  getNumberOfRooms(): number;
  setNumberOfRooms(value: number): void;

  getDistanceFromCenter(): number;
  setDistanceFromCenter(value: number): void;

  getFurnished(): boolean;
  setFurnished(value: boolean): void;

  getInternetIncluded(): boolean;
  setInternetIncluded(value: boolean): void;

  getAirConditionIncluded(): boolean;
  setAirConditionIncluded(value: boolean): void;

  getAverageRating(): number;
  setAverageRating(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdDetailsMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AdDetailsMessage): AdDetailsMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdDetailsMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdDetailsMessage;
  static deserializeBinaryFromReader(message: AdDetailsMessage, reader: jspb.BinaryReader): AdDetailsMessage;
}

export namespace AdDetailsMessage {
  export type AsObject = {
    id: number,
    startDate: string,
    endDate: string,
    postingDate: string,
    price: number,
    securityDeposit: number,
    guestPreference: string,
    additionalInfo: string,
    type: string,
    country: string,
    city: string,
    address: string,
    size: number,
    numberOfRooms: number,
    distanceFromCenter: number,
    furnished: boolean,
    internetIncluded: boolean,
    airConditionIncluded: boolean,
    averageRating: number,
  }
}

