import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginMessage } from 'src/proto/auth/auth_pb';
import { UserLogin } from '@core/model/user-login';
import { AuthService } from 'src/proto/auth/auth_pb_service';
import { grpc } from '@improbable-eng/grpc-web';
import { environment } from 'src/environments/environment';
import { UserWithToken } from '@core/model/user-with-token';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth-token-service/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authTokenService: AuthTokenService
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
          // tslint:disable-next-line: no-string-literal
          const returnMessage = returnValue['returnMessage'];

          if (returnMessage !== 'OK') {
            this.toastr.error(returnMessage);
          } else {
            // tslint:disable-next-line: no-string-literal
            const userToken: UserWithToken = new UserWithToken(returnValue['accessToken'], returnValue['expiresIn'],
                          // tslint:disable-next-line: no-string-literal
                          returnValue['userId'], returnValue['role']);
            this.authTokenService.handleAuthentication(userToken);
            if (userToken.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if (userToken.role === 'ROLE_LANDLORD') {
              this.router.navigate(['/landlord']);
            } else {
              this.router.navigate(['/tenant']);
            }

          }
        } else {
          this.toastr.error('An error occurred while logging in');
        }
      },
    });

  }

}
