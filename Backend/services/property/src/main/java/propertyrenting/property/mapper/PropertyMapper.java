package propertyrenting.property.mapper;

import propertyrenting.property.model.Property;
import proto.property.PropertyImageMessage;
import proto.property.PropertyMessage;

public class PropertyMapper {

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

}
