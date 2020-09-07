package propertyrenting.property.mapper;

import com.google.protobuf.ByteString;
import propertyrenting.property.model.PropertyImage;
import proto.property.PropertyImageMessage;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class PropertyImageMapper {

    public PropertyImage toPropertyImage(PropertyImageMessage propertyImageMessage) {
        return new PropertyImage(propertyImageMessage.getName(), propertyImageMessage.getType(),
                propertyImageMessage.getPicByte().toByteArray());
    }

    public PropertyImageMessage toPropertyImageMessage(PropertyImage propertyImage) {
        return PropertyImageMessage.newBuilder()
                .setName(propertyImage.getName())
                .setType(propertyImage.getType())
                .setPicByte(ByteString.copyFrom(propertyImage.getPicByte()))
                .build();
    }
}
