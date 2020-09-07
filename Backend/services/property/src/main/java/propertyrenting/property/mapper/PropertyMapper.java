package propertyrenting.property.mapper;

import propertyrenting.property.model.Property;
import proto.property.PropertyImageMessage;
import proto.property.PropertyMessage;
import proto.property.PropertyStatsMessage;
import proto.propertyInfo.PropertyInfoMessage;

public class PropertyMapper {

    private PropertyImageMapper propertyImageMapper;

    public PropertyMapper() {
        this.propertyImageMapper = new PropertyImageMapper();
    }

    public Property toProperty(PropertyMessage propertyMessage) {
        return new Property(propertyMessage.getCountry(), propertyMessage.getCity(), propertyMessage.getAddress(),
                propertyMessage.getSize(), propertyMessage.getFurnished(), propertyMessage.getNumberOfRooms(),
                propertyMessage.getDistanceFromCenter(), propertyMessage.getInternetIncluded(),
                propertyMessage.getAirConditionIncluded());
    }

    public PropertyMessage toPropertyMessage(Property property, PropertyImageMessage propertyImageMessage) {
        return PropertyMessage.newBuilder()
                .setId(property.getId())
                .setTypeId(property.getPropertyType().getId())
                .setCountry(property.getCountry())
                .setCity(property.getCity())
                .setAddress(property.getAddress())
                .setSize(property.getSize())
                .setFurnished(property.isFurnished())
                .setNumberOfRooms(property.getNumberOfRooms())
                .setDistanceFromCenter(property.getDistanceFromCenter())
                .setInternetIncluded(property.isInternetIncluded())
                .setAirConditionIncluded(property.isAirConditionIncluded())
                .setAverageRating(property.getAverageRating())
                .setImage(propertyImageMessage)
                .build();
    }

    public PropertyInfoMessage toPropertyInfoMessage(Property property) {
        return PropertyInfoMessage.newBuilder()
                .setId(property.getId())
                .setType(property.getPropertyType().getName())
                .setCountry(property.getCountry())
                .setCity(property.getCity())
                .setAddress(property.getAddress())
                .setSize(property.getSize())
                .setNumberOfRooms(property.getNumberOfRooms())
                .setDistanceFromCenter(property.getDistanceFromCenter())
                .setFurnished(property.isFurnished())
                .setInternetIncluded(property.isInternetIncluded())
                .setAirConditionIncluded(property.isAirConditionIncluded())
                .setAverageRating(property.getAverageRating())
                .setLandlord(property.getLandlord().getId())
                .build();
    }

    public PropertyStatsMessage toPropertyStatsMessage(Property property, int position, int numberOfBookings) {
        return PropertyStatsMessage.newBuilder()
                .setId(property.getId())
                .setPosition(position)
                .setCountry(property.getCountry())
                .setCity(property.getCity())
                .setAddress(property.getAddress())
                .setType(property.getPropertyType().getName())
                .setNumberOfBookings(numberOfBookings)
                .setAverageRating(property.getAverageRating())
                .setImage(this.propertyImageMapper.toPropertyImageMessage(property.getPropertyImagesSet()
                            .iterator().next()))
                .build();
    }
}
