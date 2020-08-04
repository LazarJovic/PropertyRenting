import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppComponent } from './root/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    SharedModule
  ]
})
export class BlocksModule { }
