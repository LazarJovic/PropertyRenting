package propertyrenting.user.mapper;

import propertyrenting.user.model.*;
import proto.user.UserMessage;

public class UserMapper {

    public Landlord toLandlord(RegisterRequest registerRequest) {
        return new Landlord(registerRequest.getFirstName(), registerRequest.getSurname(),
                registerRequest.getEmail(), registerRequest.getPhone(), registerRequest.getPassword(),
                registerRequest.getCountry(), registerRequest.getCity(), registerRequest.getAddress(),
                registerRequest.getPostcode());
    }

    public Tenant toTenant(RegisterRequest registerRequest) {
        return new Tenant(registerRequest.getFirstName(), registerRequest.getSurname(),
                registerRequest.getEmail(), registerRequest.getPhone(), registerRequest.getPassword(),
                registerRequest.getCountry(), registerRequest.getCity(), registerRequest.getAddress(),
                registerRequest.getPostcode());
    }

    public UserMessage toUserMessage(Client user) {
        return UserMessage.newBuilder()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setSurname(user.getSurname())
                .setEmail(user.getEmail())
                .setPhone(user.getPhone())
                .setAccountBlocked(user.isAccountBlocked())
                .setRole(user.getRoleSet().iterator().next().getRoleType().toString())
                .build();
    }
}
