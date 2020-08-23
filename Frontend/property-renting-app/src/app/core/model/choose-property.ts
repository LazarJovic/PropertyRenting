import { PropertyImage } from './property-image';

export class ChooseProperty {

  public id: number;
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

  constructor(id: number, country: string, city: string, address: string, size: number, numberOfRooms: number, distanceFromCenter: number,
              furnished: boolean, internet: boolean, airCondition: boolean) {
      this.id = id;
      this.country = country;
      this.city = city;
      this.address = address;
      this.size = size;
      this.numberOfRooms = numberOfRooms;
      this.distanceFromCenter = distanceFromCenter;
      this.furnished = furnished;
      this.internet = internet;
      this.airCondition = airCondition;
    }

}
