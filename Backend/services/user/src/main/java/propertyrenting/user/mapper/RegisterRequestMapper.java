package propertyrenting.user.mapper;

import propertyrenting.user.model.RegisterRequest;
import proto.registerRequest.RegisterRequestMessage;

public class RegisterRequestMapper {

    public RegisterRequest toRegisterRequest(RegisterRequestMessage registerRequestMessage) {
        return new RegisterRequest(registerRequestMessage.getFirstName(), registerRequestMessage.getSurname(),
                registerRequestMessage.getEmail(), registerRequestMessage.getPassword(),
                registerRequestMessage.getPhone(), registerRequestMessage.getCountry(),
                registerRequestMessage.getCity(), registerRequestMessage.getAddress(),
                registerRequestMessage.getPostcode());
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
                .build();
    }

}
