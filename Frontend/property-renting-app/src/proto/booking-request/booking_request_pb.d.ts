// package: 
// file: booking_request.proto

import * as jspb from "google-protobuf";

export class CheckAvailabilityMessage extends jspb.Message {
  getAdId(): number;
  setAdId(value: number): void;

  getStartDate(): string;
  setStartDate(value: string): void;

  getEndDate(): string;
  setEndDate(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckAvailabilityMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CheckAvailabilityMessage): CheckAvailabilityMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckAvailabilityMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckAvailabilityMessage;
  static deserializeBinaryFromReader(message: CheckAvailabilityMessage, reader: jspb.BinaryReader): CheckAvailabilityMessage;
}

export namespace CheckAvailabilityMessage {
  export type AsObject = {
    adId: number,
    startDate: string,
    endDate: string,
  }
}

export class CheckAvailabilityResponse extends jspb.Message {
  getAvailable(): boolean;
  setAvailable(value: boolean): void;

  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckAvailabilityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CheckAvailabilityResponse): CheckAvailabilityResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckAvailabilityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckAvailabilityResponse;
  static deserializeBinaryFromReader(message: CheckAvailabilityResponse, reader: jspb.BinaryReader): CheckAvailabilityResponse;
}

export namespace CheckAvailabilityResponse {
  export type AsObject = {
    available: boolean,
    returnMessage: string,
  }
}

export class BookingRequestStatusMessage extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookingRequestStatusMessage.AsObject;
  static toObject(includeInstance: boolean, msg: BookingRequestStatusMessage): BookingRequestStatusMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookingRequestStatusMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookingRequestStatusMessage;
  static deserializeBinaryFromReader(message: BookingRequestStatusMessage, reader: jspb.BinaryReader): BookingRequestStatusMessage;
}

export namespace BookingRequestStatusMessage {
  export type AsObject = {
    status: string,
  }
}

export class BookingRequestMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCountry(): string;
  setCountry(value: string): void;

  getCity(): string;
  setCity(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getPrice(): number;
  setPrice(value: number): void;

  getSecurityDeposit(): number;
  setSecurityDeposit(value: number): void;

  getPendingDateTime(): string;
  setPendingDateTime(value: string): void;

  getAcceptanceDateTime(): string;
  setAcceptanceDateTime(value: string): void;

  getBookingStart(): string;
  setBookingStart(value: string): void;

  getBookingEnd(): string;
  setBookingEnd(value: string): void;

  getClientEmail(): string;
  setClientEmail(value: string): void;

  getAdId(): number;
  setAdId(value: number): void;

  getStatus(): string;
  setStatus(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookingRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: BookingRequestMessage): BookingRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookingRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookingRequestMessage;
  static deserializeBinaryFromReader(message: BookingRequestMessage, reader: jspb.BinaryReader): BookingRequestMessage;
}

export namespace BookingRequestMessage {
  export type AsObject = {
    id: number,
    country: string,
    city: string,
    address: string,
    price: number,
    securityDeposit: number,
    pendingDateTime: string,
    acceptanceDateTime: string,
    bookingStart: string,
    bookingEnd: string,
    clientEmail: string,
    adId: number,
    status: string,
  }
}

export class BookingRequestIdMessage extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookingRequestIdMessage.AsObject;
  static toObject(includeInstance: boolean, msg: BookingRequestIdMessage): BookingRequestIdMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookingRequestIdMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookingRequestIdMessage;
  static deserializeBinaryFromReader(message: BookingRequestIdMessage, reader: jspb.BinaryReader): BookingRequestIdMessage;
}

export namespace BookingRequestIdMessage {
  export type AsObject = {
    id: number,
  }
}

export class ChangeRequestStatusResponse extends jspb.Message {
  getReturnMessage(): string;
  setReturnMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeRequestStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeRequestStatusResponse): ChangeRequestStatusResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChangeRequestStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeRequestStatusResponse;
  static deserializeBinaryFromReader(message: ChangeRequestStatusResponse, reader: jspb.BinaryReader): ChangeRequestStatusResponse;
}

export namespace ChangeRequestStatusResponse {
  export type AsObject = {
    returnMessage: string,
  }
}

