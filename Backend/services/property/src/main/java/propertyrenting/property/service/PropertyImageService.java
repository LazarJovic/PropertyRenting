package propertyrenting.property.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import propertyrenting.property.mapper.PropertyImageMapper;
import propertyrenting.property.model.PropertyImage;
import propertyrenting.property.repository.PropertyImageRepository;
import propertyrenting.property.repository.PropertyRepository;
import proto.property.PropertyImageMessage;

@Service
public class PropertyImageService {

    private PropertyImageRepository propertyImageRepository;

    private PropertyRepository propertyRepository;

    private PropertyImageMapper propertyImageMapper;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository, PropertyRepository propertyRepository) {
        this.propertyImageRepository = propertyImageRepository;
        this.propertyRepository = propertyRepository;
        this.propertyImageMapper = new PropertyImageMapper();
    }

    PropertyImageMessage createPropertyImage(PropertyImageMessage propertyImageMessage, long propertyId) {
        PropertyImage propertyImage = this.propertyImageMapper.toPropertyImage(propertyImageMessage);
        propertyImage.setProperty(this.propertyRepository.getOne(propertyId));
        return this.propertyImageMapper.toPropertyImageMessage(this.propertyImageRepository.save(propertyImage));
    }


}
