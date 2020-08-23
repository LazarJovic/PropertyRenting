package propertyrenting.ad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import propertyrenting.ad.mapper.AdImageMapper;
import propertyrenting.ad.model.AdImage;
import propertyrenting.ad.repository.AdImageRepository;
import propertyrenting.ad.repository.AdRepository;
import proto.ad.AdImageMessage;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdImageService {

    private AdImageRepository adImageRepository;

    private AdRepository adRepository;

    private AdImageMapper adImageMapper;

    @Autowired
    public AdImageService(AdImageRepository adImageRepository, AdRepository adRepository) {
        this.adImageRepository = adImageRepository;
        this.adRepository = adRepository;
        this.adImageMapper = new AdImageMapper();
    }

    List<AdImageMessage> createAdImages(List<AdImageMessage> images, long adId) {
        List<AdImageMessage> retVal = new ArrayList<>();
        images.forEach(image -> {
            AdImage adImage = this.adImageMapper.toAdImage(image);
            adImage.setAd(this.adRepository.getOne(adId));
            retVal.add(this.adImageMapper.toAdImageMessage(this.adImageRepository.save(adImage)));
        });

        return retVal;
    }

}
