// package: 
// file: rating.proto

import * as jspb from "google-protobuf";

export class AdRatingMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getRating(): number;
  setRating(value: number): void;

  getRequestId(): number;
  setRequestId(value: number): void;

  getAdId(): number;
  setAdId(value: number): void;

  getPropertyId(): number;
  setPropertyId(value: number): void;

  getAverageRating(): number;
  setAverageRating(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AdRatingMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AdRatingMessage): AdRatingMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AdRatingMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AdRatingMessage;
  static deserializeBinaryFromReader(message: AdRatingMessage, reader: jspb.BinaryReader): AdRatingMessage;
}

export namespace AdRatingMessage {
  export type AsObject = {
    id: number,
    rating: number,
    requestId: number,
    adId: number,
    propertyId: number,
    averageRating: number,
  }
}

export class RateAdResponseMessage extends jspb.Message {
  hasRatingMessage(): boolean;
  clearRatingMessage(): void;
  getRatingMessage(): AdRatingMessage | undefined;
  setRatingMessage(value?: AdRatingMessage): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RateAdResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: RateAdResponseMessage): RateAdResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RateAdResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RateAdResponseMessage;
  static deserializeBinaryFromReader(message: RateAdResponseMessage, reader: jspb.BinaryReader): RateAdResponseMessage;
}

export namespace RateAdResponseMessage {
  export type AsObject = {
    ratingMessage?: AdRatingMessage.AsObject,
    returnMessage: string,
  }
}

