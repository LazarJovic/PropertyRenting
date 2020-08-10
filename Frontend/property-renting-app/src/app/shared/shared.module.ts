import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingCarouselComponent } from './landing-carousel/landing-carousel.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { PendingBookingRequestsComponent } from './pending-booking-requests/pending-booking-requests.component';
import { ReservedBookingRequestsComponent } from './reserved-booking-requests/reserved-booking-requests.component';
import { PaidBookingRequestsComponent } from './paid-booking-requests/paid-booking-requests.component';
import { FinishedBookingRequestsComponent } from './finished-booking-requests/finished-booking-requests.component';
import { CanceledBookingRequestsComponent } from './canceled-booking-requests/canceled-booking-requests.component';


@NgModule({
  declarations: [LandingCarouselComponent, PendingBookingRequestsComponent, ReservedBookingRequestsComponent,
     PaidBookingRequestsComponent, FinishedBookingRequestsComponent, CanceledBookingRequestsComponent],
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
    NgImageSliderModule,
    PendingBookingRequestsComponent,
    ReservedBookingRequestsComponent,
    PaidBookingRequestsComponent,
    FinishedBookingRequestsComponent,
    CanceledBookingRequestsComponent
  ]
})
export class SharedModule { }
