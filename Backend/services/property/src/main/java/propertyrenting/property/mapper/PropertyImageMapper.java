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

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        return outputStream.toByteArray();
    }

    private static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }

}
