package propertyrenting.user.mapper;

import propertyrenting.user.model.Landlord;
import propertyrenting.user.model.RegisterRequest;
import propertyrenting.user.model.Tenant;

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

}
