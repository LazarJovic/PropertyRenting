package propertyrenting.ad.mapper;

import com.google.protobuf.ByteString;
import propertyrenting.ad.model.AdImage;
import proto.ad.AdImageMessage;

public class AdImageMapper {

    public AdImage toAdImage(AdImageMessage adImageMessage) {
        return new AdImage(adImageMessage.getName(), adImageMessage.getType(),
                adImageMessage.getPicByte().toByteArray());
    }

    public AdImageMessage toAdImageMessage(AdImage adImage) {
        return AdImageMessage.newBuilder()
                .setName(adImage.getName())
                .setType(adImage.getType())
                .setPicByte(ByteString.copyFrom(adImage.getPicByte()))
                .build();
    }

}
