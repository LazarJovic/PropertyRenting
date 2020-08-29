export class SearchAd {

    public startDate: string;
    public endDate: string;
    public type: number;
    public guestPreference: string;
    public country: string;
    public city: string;
    public address: string;
    public sizeMin: number;
    public sizeMax: number;
    public numberOfRoomsMin: number;
    public numberOfRoomsMax: number;
    public distanceFromCenterMin: number;
    public distanceFromCenterMax: number;
    public priceMin: number;
    public priceMax: number;
    public furnished: boolean;
    public internetIncluded: boolean;
    public airConditionIncluded: boolean;

    constructor(startDate: string, endDate: string, type: number, guestPreference: string, country: string, city: string,
                address: string, sizeMin: number, sizeMax: number, numberOfRoomsMin: number, numberOfRoomsMax: number,
                distanceFromCenterMin: number, distanceFromCenterMax: number, priceMin: number, priceMax: number,
                furnished: boolean, internetIncluded: boolean, airConditionIncluded: boolean) {
            this.startDate = startDate;
            this.endDate = endDate;
            this.type = type;
            this.guestPreference = guestPreference;
            this.country = country;
            this.city = city;
            this.address = address;
            this.sizeMin = sizeMin;
            this.sizeMax = sizeMax;
            this.numberOfRoomsMin = numberOfRoomsMax;
            this.numberOfRoomsMax = numberOfRoomsMax;
            this.distanceFromCenterMin = distanceFromCenterMin;
            this.distanceFromCenterMax = distanceFromCenterMax;
            this.priceMin = priceMin;
            this.priceMax = priceMax;
            this.furnished = furnished;
            this.internetIncluded = internetIncluded;
            this.airConditionIncluded = airConditionIncluded;
        }

}
