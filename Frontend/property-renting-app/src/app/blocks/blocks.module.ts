import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppComponent } from './root/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '@shared/shared.module';
import { LandingCarouselComponent } from './landing-carousel/landing-carousel.component';
import { AuthModule } from '../features/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LandingCarouselComponent,
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    SharedModule,
    AuthModule
  ]
})
export class BlocksModule { }
