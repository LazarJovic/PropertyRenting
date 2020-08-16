package propertyrenting.property.mapper;

import propertyrenting.property.model.PropertyType;
import proto.propertyType.PropertyTypeMessage;

public class PropertyTypeMapper {

    public PropertyType toPropertyType(PropertyTypeMessage propertyTypeMessage) {
        return new PropertyType(propertyTypeMessage.getName(), propertyTypeMessage.getDescription());
    }

    public PropertyTypeMessage toPropertyTypeMessage(PropertyType propertyType) {
        PropertyTypeMessage message = PropertyTypeMessage.newBuilder()
                .setId(propertyType.getId())
                .setName(propertyType.getName())
                .setDescription(propertyType.getDescription())
                .build();

        return message;
    }

}
