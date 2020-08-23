export class Ad {

    public id: number;
    public propertyId: number;
    public durationLimited: boolean;
    public startDate: string;
    public endDate: string;
    public guestPreference: string;
    public pricePerNight: number;
    public securityDeposit: number;
    public additionalInfo: string;

    constructor(id: number, propertyId: number, durationLimited: boolean, startDate: string, endDate: string, guestPreference: string,
                pricePerNight: number, securityDeposit: number, additionalInfo: string) {
            this.id = id;
            this.propertyId = propertyId;
            this.durationLimited = durationLimited;
            this.startDate = startDate;
            this.endDate = endDate;
            this.guestPreference = guestPreference;
            this.pricePerNight = pricePerNight;
            this.securityDeposit = securityDeposit;
            this.additionalInfo = additionalInfo;
        }

}
