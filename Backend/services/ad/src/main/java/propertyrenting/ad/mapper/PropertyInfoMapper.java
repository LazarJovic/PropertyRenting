package propertyrenting.ad.mapper;

import propertyrenting.ad.model.PropertyInfo;
import proto.propertyInfo.PropertyInfoMessage;

public class PropertyInfoMapper {

    public PropertyInfo toPropertyInfo(PropertyInfoMessage propertyInfoMessage) {
        return new PropertyInfo(propertyInfoMessage.getId(), propertyInfoMessage.getType(),
                propertyInfoMessage.getCountry(), propertyInfoMessage.getCity(), propertyInfoMessage.getAddress(),
                propertyInfoMessage.getSize(), propertyInfoMessage.getFurnished(), propertyInfoMessage.getNumberOfRooms(),
                propertyInfoMessage.getDistanceFromCenter(), propertyInfoMessage.getInternetIncluded(),
                propertyInfoMessage.getAirConditionIncluded());
    }

}
