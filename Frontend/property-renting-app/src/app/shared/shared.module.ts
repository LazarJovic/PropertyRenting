import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingCarouselComponent } from './landing-carousel/landing-carousel.component';
import { NgImageSliderModule } from 'ng-image-slider';


@NgModule({
  declarations: [LandingCarouselComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule
  ]
})
export class SharedModule { }
