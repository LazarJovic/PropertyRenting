import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginMessage } from 'src/proto/auth/auth_pb';
import { UserLogin } from '@core/model/user-login';
import { AuthService } from 'src/proto/auth/auth_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private toastr: ToastrService
  ) { }

  login(userLogin: UserLogin) {

    const loginMessage: LoginMessage = new LoginMessage();
    loginMessage.setUsername(userLogin.email);
    loginMessage.setPassword(userLogin.password);

    grpc.unary(AuthService.Login, {
      request: loginMessage,
      host: environment.user,
      onEnd: (res) => {
        const { status, statusMessage, headers, message, trailers } = res;

        if (status === grpc.Code.OK && message) {
          const returnValue = message.toObject();
          console.log(returnValue);
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          returnMessage === 'OK'
            ? this.toastr.success('Property type created!')
            : this.toastr.error(returnMessage);
        } else {
          this.toastr.error('An error occurred while creating property type');
        }
      },
    });


  }

}
