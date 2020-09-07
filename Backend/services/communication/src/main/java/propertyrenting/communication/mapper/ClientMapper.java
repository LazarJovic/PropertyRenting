package propertyrenting.communication.mapper;

import propertyrenting.communication.model.Client;
import proto.user.CreateClientMessage;

public class ClientMapper {

    public Client toClient(CreateClientMessage createClientMessage) {
        return new Client(createClientMessage.getId(), createClientMessage.getFirstName(), createClientMessage.getSurname(),
                createClientMessage.getEmail());
    }

}
