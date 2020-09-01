package propertyrenting.ad.mapper;

import propertyrenting.ad.enumeration.GuestPreference;
import propertyrenting.ad.model.Ad;
import proto.ad.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class AdMapper {

    private AdImageMapper adImageMapper;

    public AdMapper() {
        this.adImageMapper = new AdImageMapper();
    }

    public Ad toAd(AdMessage adMessage) {

        LocalDate startDate = LocalDate.parse(adMessage.getStartDate());
        LocalDate endDate;
        if(adMessage.getDurationLimited()) {
             endDate = LocalDate.parse(adMessage.getEndDate());
        }
        else {
            endDate = null;
        }


        Ad ad = new Ad(adMessage.getPricePerNight(), adMessage.getSecurityDeposit(), LocalDateTime.now(),
                adMessage.getDurationLimited(), startDate, endDate, adMessage.getAdditionalInfo());

        switch (adMessage.getGuestPreference().toUpperCase()) {
            case "STUDENT" : ad.setGuestPreference(GuestPreference.STUDENT); break;
            case "FAMILY" : ad.setGuestPreference(GuestPreference.FAMILY); break;
            case "COUPLE" : ad.setGuestPreference(GuestPreference.COUPLE); break;
            case "WORKING PROFESSIONAL" : ad.setGuestPreference(GuestPreference.WORKING_PROFESSIONAL); break;
            default : ad.setGuestPreference(GuestPreference.NOT_IMPORTANT);
        }

        return ad;

    }

    public AdMessage toAdMessage(Ad ad) {

        String endDate = "";
        if(ad.isDurationLimited()) {
            endDate = ad.getEndDate().toString();
        }

        return AdMessage.newBuilder()
                .setId(ad.getId())
                .setDurationLimited(ad.isDurationLimited())
                .setStartDate(ad.getStartDate().toString())
                .setEndDate(endDate)
                .setGuestPreference(ad.getGuestPreference().toString())
                .setPricePerNight(ad.getPricePerNight())
                .setSecurityDeposit(ad.getSecurityDeposit())
                .setAdditionalInfo(ad.getAdditionalInfo())
                .build();
    }

    public SearchAdResultMessage toSearchResultMessage(Ad ad) {
        return SearchAdResultMessage.newBuilder()
                .setId(ad.getId())
                .setStartDate(ad.getStartDate().toString())
                .setEndDate(ad.getEndDate().toString())
                .setType(ad.getPropertyInfo().getPropertyType())
                .setCountry(ad.getPropertyInfo().getCountry())
                .setCity(ad.getPropertyInfo().getCity())
                .setAddress(ad.getPropertyInfo().getAddress())
                .setSecurityDeposit(ad.getSecurityDeposit())
                .setPrice(ad.getPricePerNight())
                .setImage(this.adImageMapper.toAdImageMessage(ad.getAdImageSet().iterator().next()))
                .build();
    }

    public AdDetailsMessage toAdDetailsMessage(Ad ad) {

        return AdDetailsMessage.newBuilder()
                .setId(ad.getId())
                .setStartDate(ad.getStartDate().toString())
                .setEndDate(ad.getEndDate().toString())
                .setPostingDate(ad.getPostingDate().toLocalDate().toString())
                .setPrice(ad.getPricePerNight())
                .setSecurityDeposit(ad.getSecurityDeposit())
                .setGuestPreference(ad.getGuestPreference().toString())
                .setAdditionalInfo(ad.getAdditionalInfo())
                .setType(ad.getPropertyInfo().getPropertyType())
                .setCountry(ad.getPropertyInfo().getCountry())
                .setCity(ad.getPropertyInfo().getCity())
                .setAddress(ad.getPropertyInfo().getAddress())
                .setSize(ad.getPropertyInfo().getSize())
                .setNumberOfRooms(ad.getPropertyInfo().getNumberOfRooms())
                .setDistanceFromCenter(ad.getPropertyInfo().getDistanceFromCenter())
                .setFurnished(ad.getPropertyInfo().isFurnished())
                .setInternetIncluded(ad.getPropertyInfo().isInternetIncluded())
                .setAirConditionIncluded(ad.getPropertyInfo().isAirConditionIncluded())
                .setAverageRating(ad.getPropertyInfo().getAverageRating())
                .build();
    }

    public MyAdMessage toMyAdMessage(Ad ad) {

        return MyAdMessage.newBuilder()
            .setId(ad.getId())
            .setCountry(ad.getPropertyInfo().getCountry())
            .setCity(ad.getPropertyInfo().getCity())
            .setAddress(ad.getPropertyInfo().getAddress())
            .setPostingDate(ad.getPostingDate().toString())
            .setStartDate(ad.getStartDate().toString())
            .setEndDate(ad.getEndDate().toString())
            .setPrice(ad.getPricePerNight())
            .setImage(this.adImageMapper.toAdImageMessage(ad.getAdImageSet().iterator().next()))
            .build();
    }
}
