import { AdImage } from './ad-image';

export class AdDetails {

    public id: number;
    public startDate: string;
    public endDate: string;
    public postingDate: string;
    public price: number;
    public securityDeposit: number;
    public guestPreference: string;
    public additionalInfo: string;
    public type: string;
    public country: string;
    public city: string;
    public address: string;
    public size: number;
    public numberOfRooms: number;
    public distanceFromCenter: number;
    public furnished: boolean;
    public internetIncluded: boolean;
    public airConditionIncluded: boolean;
    public averageRating: number;
    public images: Array<AdImage>;

    constructor(id: number, startDate: string, endDate: string, postingDate: string, price: number, securityDeposit: number,
                guestPreference: string, additionalInfo: string, type: string, country: string, city: string, address: string,
                size: number, numberOfRooms: number, distanceFromCenter: number, furnished: boolean, internetIncluded: boolean,
                airConditionIncluded: boolean, averageRating: number, images: Array<AdImage>) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.postingDate = postingDate;
        this.price = price;
        this.securityDeposit = securityDeposit;
        this.guestPreference = guestPreference;
        this.additionalInfo = additionalInfo;
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
        this.averageRating = averageRating;
        this.images = images;
    }


}