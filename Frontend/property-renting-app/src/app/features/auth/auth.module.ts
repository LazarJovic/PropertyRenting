import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VerifyComponent } from './verify/verify.component';
import { LandingCarouselComponent } from './landing-carousel/landing-carousel.component';


@NgModule({
  declarations: [LandingPageComponent, LandingCarouselComponent, LoginComponent, RegisterComponent, VerifyComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
