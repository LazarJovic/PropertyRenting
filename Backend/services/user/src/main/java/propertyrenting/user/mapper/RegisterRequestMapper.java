package propertyrenting.user.mapper;

import propertyrenting.user.model.RegisterRequest;
import propertyrenting.user.model.User;
import proto.registerRequest.RegisterRequestMessage;
import proto.user.CreateClientMessage;

public class RegisterRequestMapper {

    public RegisterRequest toRegisterRequest(RegisterRequestMessage registerRequestMessage) {
        return new RegisterRequest(registerRequestMessage.getFirstName(), registerRequestMessage.getSurname(),
                registerRequestMessage.getEmail(), registerRequestMessage.getPassword(),
                registerRequestMessage.getPhone(), registerRequestMessage.getCountry(),
                registerRequestMessage.getCity(), registerRequestMessage.getAddress(),
                registerRequestMessage.getPostcode(), registerRequestMessage.getIsLandlord());
    }

    public RegisterRequestMessage toRegisterRequestMessage(RegisterRequest registerRequest) {
        return RegisterRequestMessage.newBuilder()
                .setId(registerRequest.getId())
                .setFirstName(registerRequest.getFirstName())
                .setSurname(registerRequest.getSurname())
                .setEmail(registerRequest.getEmail())
                .setPassword(registerRequest.getPassword())
                .setConfirmPassword(registerRequest.getPassword())
                .setPhone(registerRequest.getPhone())
                .setCountry(registerRequest.getCountry())
                .setCity(registerRequest.getCity())
                .setAddress(registerRequest.getAddress())
                .setIsLandlord(registerRequest.isLandlord())
                .build();
    }

    public CreateClientMessage toCreateClientMessage(User user, boolean isLandlord) {
        return CreateClientMessage.newBuilder()
                .setId(user.getId())
                .setFirstName(user.getFirstName())
                .setSurname(user.getSurname())
                .setEmail(user.getEmail())
                .setIsLandlord(isLandlord)
                .build();
    }

}
