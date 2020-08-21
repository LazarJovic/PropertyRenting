package propertyrenting.user.mapper;

import propertyrenting.user.model.RegisterRequest;
import proto.registerRequest.RegisterRequestMessage;
import propertyrenting.user.model.User;

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

    public User toUser(RegisterRequest registerRequest) {
        return new User(registerRequest.getFirstName(), registerRequest.getSurname(), registerRequest.getEmail(),
                registerRequest.getPhone(), registerRequest.getPassword());
    }

}
