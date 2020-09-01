export class MyProperty {

    public id: number;
    public country: string;
    public city: string;
    public address: string;
    public size: number;
    public furnished: boolean;
    public internetIncluded: boolean;
    public airConditionIncluded: boolean;
    public image: any;

    constructor(id: number, country: string, city: string, address: string, size: number, furnished: boolean,
                internetIncluded: boolean, airConditionIncluded: boolean, image: any) {
            this.id = id;
            this.country = country;
            this.city = city;
            this.address = address;
            this.size = size;
            this.furnished = furnished;
            this.internetIncluded = internetIncluded;
            this.airConditionIncluded = airConditionIncluded;
            this.image = image;
        }
}
