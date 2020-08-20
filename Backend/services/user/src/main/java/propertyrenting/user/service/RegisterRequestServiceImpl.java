package propertyrenting.user.service;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import propertyrenting.user.mapper.RegisterRequestMapper;
import propertyrenting.user.model.RegisterRequest;
import propertyrenting.user.repository.RegisterRequestRepository;
import propertyrenting.user.repository.UserRepository;
import proto.registerRequest.CreateRegisterRequestResponse;
import proto.registerRequest.RegisterRequestMessage;
import proto.registerRequest.RegisterRequestServiceGrpc;

import java.time.LocalDateTime;
import java.util.UUID;

@GrpcService
public class RegisterRequestServiceImpl extends RegisterRequestServiceGrpc.RegisterRequestServiceImplBase {

    private RegisterRequestRepository registerRequestRepository;

    private ValidationService validationService;

    private CustomUserDetailsService customUserDetailsService;

    private EmailService emailService;

    private UserRepository userRepository;

    private RegisterRequestMapper registerRequestMapper;

    @Autowired
    public RegisterRequestServiceImpl(RegisterRequestRepository registerRequestRepository, ValidationService validationService,
                                      CustomUserDetailsService customUserDetailsService, EmailService emailService,
                                      UserRepository userRepository) {
        this.registerRequestRepository = registerRequestRepository;
        this.validationService = validationService;
        this.customUserDetailsService = customUserDetailsService;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.registerRequestMapper = new RegisterRequestMapper();
    }

    public void createRegisterRequest(RegisterRequestMessage request, StreamObserver<CreateRegisterRequestResponse> responseObserver) {

        CreateRegisterRequestResponse response;
        String validationMessage = this.validateRegisterRequest(request);
        if(!validationMessage.equals("ok")) {
            response = CreateRegisterRequestResponse.newBuilder()
                    .setRegisterRequest(request)
                    .setReturnMessage(validationMessage)
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }
        else {
            RegisterRequest registerRequest = this.registerRequestMapper.toRegisterRequest(request);
            registerRequest.setPassword(this.customUserDetailsService.encodePassword(request.getPassword()));
            UUID requestVerificationToken = UUID.randomUUID();
            registerRequest.setVerificationToken(requestVerificationToken);
            registerRequest.setVerificationTokenTime(LocalDateTime.now());

            RegisterRequest savedRegisterRequest = this.registerRequestRepository.save(registerRequest);
            emailService.sendSimpleMessage(
                    savedRegisterRequest.getEmail(),
                    "Verify your Property Renting account",
                    "To verify your account you will need to enter your email address along with the verification token." +
                            "Your verification token is: " + requestVerificationToken.toString() +
                            " and it expires in 30 minutes." +
                            " Visit this link to verify your account: http://localhost:4200/verify"
            );

            response = CreateRegisterRequestResponse.newBuilder()
                    .setRegisterRequest(this.registerRequestMapper.toRegisterRequestMessage(savedRegisterRequest))
                    .setReturnMessage("OK")
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }

    }

    private String validateRegisterRequest(RegisterRequestMessage registerRequestMessage) {
        if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getFirstName())) {
            return "You have to provide your first name";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getSurname())) {
            return "You have to provide your last name";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getCountry())) {
            return "You have to provide your country of residence";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getCity())) {
            return "You have to provide your city of residence";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getAddress())) {
            return "You have to provide your address of residence";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getPhone())) {
            return "You have to provide your phone";
        }
        else if(!this.validationService.isNumber(registerRequestMessage.getPhone())) {
            return "Phone can only contain numbers";
        }
        else if(this.validationService.isStringNullOrEmpty(registerRequestMessage.getPostcode())) {
            return "You have to provide your postcode";
        }
        else if(!this.validationService.isNumber(registerRequestMessage.getPostcode())) {
            return "Postcode can only contain numbers";
        }
        else if(!this.validationService.isEmailValid(registerRequestMessage.getEmail())) {
            return "Email is not valid";
        }
        else if(!this.validationService.isPasswordLengthValid(registerRequestMessage.getEmail())) {
            return "Password must contain 8 characters";
        }
        else if(!registerRequestMessage.getPassword().equals(registerRequestMessage.getConfirmPassword())) {
            return "Passwords do not match";
        }
        else if(this.registerRequestRepository.findByEmail(registerRequestMessage.getEmail()) != null ||
                this.userRepository.findByEmail(registerRequestMessage.getEmail()) != null)  {
            return "Email already in use";
        }

        return "ok";
    }

}
