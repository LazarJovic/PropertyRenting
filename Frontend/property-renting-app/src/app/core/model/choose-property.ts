import { PropertyImage } from './property-image';

export class ChooseProperty {
  public id: number;
  public type: string;
  public country: string;
  public city: string;
  public address: string;
  public size: number;
  public numberOfRooms: number;
  public distanceFromCenter: number;
  public furnished: boolean;
  public internet: boolean;
  public airCondition: boolean;
  public image: PropertyImage;
}
