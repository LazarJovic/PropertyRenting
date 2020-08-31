export class BookingRequest {

    public id: number;
    public adId: number;
    public country: string;
    public city: string;
    public address: string;
    public price: number;
    public securityDeposit: number;
    public pendingDateTime: string;
    public acceptanceDateTime: string;
    public bookingStart: string;
    public bookingEnd: string;
    public clientEmail: string;


    constructor(id: number, adId: number, country: string, city: string, address: string, price: number, securityDeposit: number,
                pendingDateTime: string, acceptanceDateTime: string, bookingStart: string, bookingEnd: string, clientEmail: string) {
            this.id = id;
            this.adId = adId;
            this.country = country;
            this.city = city;
            this.address = address;
            this.price = price;
            this.securityDeposit = securityDeposit;
            this.pendingDateTime = pendingDateTime;
            this.acceptanceDateTime = acceptanceDateTime;
            this.bookingStart = bookingStart;
            this.bookingEnd = bookingEnd;
            this.clientEmail = clientEmail;
        }
}
