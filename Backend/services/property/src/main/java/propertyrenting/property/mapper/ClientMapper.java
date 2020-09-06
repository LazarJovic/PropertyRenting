package propertyrenting.property.mapper;

import propertyrenting.property.model.Client;
import proto.user.CreateClientMessage;

public class ClientMapper {

    public Client toLandlord(CreateClientMessage createClientMessage) {
        return new Client(createClientMessage.getId(), createClientMessage.getFirstName(),
                createClientMessage.getSurname(), createClientMessage.getEmail());
    }

}
