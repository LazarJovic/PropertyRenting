import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserWithToken } from '@core/model/user-with-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  loggedUser = new BehaviorSubject<UserWithToken>(JSON.parse(localStorage.getItem('loggedUser')));

  constructor(
    private router: Router
  ) { }

  handleAuthentication(
    resData: UserWithToken
  ) {
    const user = new UserWithToken(
      resData.accessToken,
      resData.expiresIn,
      resData.userId,
      resData.role);
    this.loggedUser.next(user);
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getAccessToken(): string {
    const user: {
      accessToken: string;
      expiresIn: number;
      userId: number;
      role: string;
      passwordChanged: boolean;
      numLogin: number;
    } = JSON.parse(localStorage.getItem('loggedUser'));

    return user.accessToken;
  }

  getLoggedUser(): UserWithToken {
      const user: {
        accessToken: string;
        expiresIn: number;
        userId: number;
        role: string;
        passwordChanged: boolean;
        numLogin: number;
      } = JSON.parse(localStorage.getItem('loggedUser'));

      return new UserWithToken(user.accessToken, user.expiresIn, user.userId, user.role);
  }

  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('loggedUser');
  }
}
