export class CheckAvailability {

    public adId: number;
    public startDate: string;
    public endDate: string;

    constructor(adId: number, startDate: string, endDate: string) {
        this.adId = adId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}
