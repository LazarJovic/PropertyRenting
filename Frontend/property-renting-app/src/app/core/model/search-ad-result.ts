export class SearchAdResult {

    public id: number;
    public startDate: string;
    public endDate: string;
    public type: string;
    public country: string;
    public city: string;
    public address: string;
    public securityDeposit: number;
    public price: number;
    public image: any;

    constructor(id: number, startDate: string, endDate: string, type: string, country: string, city: string, address: string,
                securityDeposit: number, price: number, image: any) {
            this.id = id;
            this.startDate = startDate;
            this.endDate = endDate;
            this.type = type;
            this.country = country;
            this.city = city;
            this.address = address;
            this.securityDeposit = securityDeposit;
            this.price = price;
            this.image = image;
        }

}
