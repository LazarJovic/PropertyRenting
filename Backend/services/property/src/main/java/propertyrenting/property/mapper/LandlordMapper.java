package propertyrenting.property.mapper;

import propertyrenting.property.model.Landlord;
import proto.user.CreateClientMessage;

public class LandlordMapper {

    public Landlord toLandlord(CreateClientMessage createClientMessage) {
        return new Landlord(createClientMessage.getId(), createClientMessage.getFirstName(),
                createClientMessage.getSurname(), createClientMessage.getEmail());
    }

}
