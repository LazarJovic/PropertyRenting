export class PropertyStats {

    public id: number;
    public position: number;
    public country: string;
    public city: string;
    public address: string;
    public type: string;
    public numberOfBookings: number;
    public averageRating: number;
    public image: any;

    constructor(id: number, position: number, country: string, city: string, address: string, type: string,
                numberOfBookings: number, averageRating: number, image: any) {
            this.id = id;
            this.position = position;
            this.country = country;
            this.city = city;
            this.address = address;
            this.type = type;
            this.numberOfBookings = numberOfBookings;
            this.averageRating = averageRating;
            this.image = image;
    }
}
