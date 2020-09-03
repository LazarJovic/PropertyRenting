package propertyrenting.communication.mapper;

import propertyrenting.communication.model.AdRating;
import proto.adRating.AdRatingMessage;

public class AdRatingMapper {

    public AdRatingMessage toAdRatingMessage(AdRating adRating, double avg) {
        return AdRatingMessage.newBuilder()
                .setId(adRating.getId())
                .setRating(adRating.getRating())
                .setRequestId(adRating.getBooking().getId())
                .setAdId(adRating.getBooking().getAdId())
                .setPropertyId(adRating.getBooking().getPropertyId())
                .setAverageRating(avg)
                .build();
    }

}
