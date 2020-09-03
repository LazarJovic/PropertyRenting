export class Rating {

    public id: number;
    public rating: number;
    public requestId: number;
    public adId: number;
    public propertyId: number;
    public averageRating: number;

    constructor(id: number, rating: number, requestId: number, adId: number, propertyId: number, averageRating: number) {
        this.id = id;
        this.rating = rating;
        this.requestId = requestId;
        this.adId = adId;
        this.propertyId = propertyId;
        this.averageRating = averageRating;
    }

}
