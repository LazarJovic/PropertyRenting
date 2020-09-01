export class MyAd {

    public id: number;
    public country: string;
    public city: string;
    public address: string;
    public postingDate: string;
    public startDate: string;
    public endDate: string;
    public pricePerNight: number;
    public image: any;

    constructor(id: number, country: string, city: string, address: string, postingDate: string, startDate: string, endDate: string,
                pricePerNight: number, image: any) {
            this.id = id;
            this.country = country;
            this.city = city;
            this.address = address;
            this.postingDate = postingDate;
            this.startDate = startDate;
            this.endDate = endDate;
            this.pricePerNight = pricePerNight;
            this.image = image;
        }

}
