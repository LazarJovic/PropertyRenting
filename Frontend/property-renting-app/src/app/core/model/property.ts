export class Property {

    public id: number;
    public type: number;
    public country: string;
    public city: string;
    public address: string;
    public size: number;
    public numberOfRooms: number;
    public distanceFromCenter: number;
    public furnished: boolean;
    public internetIncluded: boolean;
    public airConditionIncluded: boolean;

    constructor(id: number, type: number, country: string, city: string, address: string, size: number, numberOfRooms: number,
                distanceFromCenter: number, furnished: boolean, internetIncluded: boolean, airConditionIncluded: boolean) {
            this.id = id;
            this.type = type;
            this.country = country;
            this.city = city;
            this.address = address;
            this.size = size;
            this.numberOfRooms = numberOfRooms;
            this.distanceFromCenter = distanceFromCenter;
            this.furnished = furnished;
            this.internetIncluded = internetIncluded;
            this.airConditionIncluded = airConditionIncluded;
        }
}
