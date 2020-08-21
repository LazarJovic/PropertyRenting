import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from '@core/model/register-request';
import { RegisterRequestMessage, EmailVerificationMessage } from 'src/proto/register-request/register_request_pb';
import { RegisterRequestService } from 'src/proto/register-request/register_request_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';
import { EmailVerification } from '@core/model/email-verification';

@Injectable({
  providedIn: 'root'
})
export class RegisterRequestsService {

  constructor(
    private toastr: ToastrService
  ) { }

  createRegisterRequest(registerRequest: RegisterRequest) {

    const registerRequestMessage: RegisterRequestMessage = new RegisterRequestMessage();
    registerRequestMessage.setId(registerRequest.id);
    registerRequestMessage.setFirstName(registerRequest.firstName);
    registerRequestMessage.setSurname(registerRequest.surname);
    registerRequestMessage.setEmail(registerRequest.email);
    registerRequestMessage.setPhone(registerRequest.phone);
    registerRequestMessage.setCountry(registerRequest.country);
    registerRequestMessage.setCity(registerRequest.city);
    registerRequestMessage.setAddress(registerRequest.address);
    registerRequestMessage.setPostcode(registerRequest.postcode);
    registerRequestMessage.setPassword(registerRequest.password);
    registerRequestMessage.setConfirmPassword(registerRequest.confirmPassword);
    registerRequestMessage.setIsLandlord(registerRequest.landlord);

    grpc.unary(RegisterRequestService.CreateRegisterRequest, {
      request: registerRequestMessage,
      host: environment.user,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('An email has been sent to your email address with a link to verify your account')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while creating register request');
        }
      },
    });
  }

  verifyEmail(emailVerification: EmailVerification) {

      const emailVerificationMessage: EmailVerificationMessage = new EmailVerificationMessage();
      emailVerificationMessage.setEmail(emailVerification.email);
      emailVerificationMessage.setToken(emailVerification.token);

      grpc.unary(RegisterRequestService.VerifyEmail, {
        request: emailVerificationMessage,
        host: environment.user,
        onEnd: (res) => {
          const { status, statusMessage, headers, message, trailers } = res;

          if (status === grpc.Code.OK && message) {
            const returnValue = message.toObject();
            // tslint:disable-next-line: no-string-literal
            const returnMessage = returnValue['returnMessage'];

            returnMessage === 'OK'
              ? this.toastr.success('Your account is successfully verified. You are now able to log in.')
              : this.toastr.error(returnMessage);
          } else {
            this.toastr.error('An error occurred while verifying account');
          }
        },
      });

  }

}
