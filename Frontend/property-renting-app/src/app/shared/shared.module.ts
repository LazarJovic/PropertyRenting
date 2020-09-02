import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
import { PendingBookingRequestsComponent } from './pending-booking-requests/pending-booking-requests.component';
import { ReservedBookingRequestsComponent } from './reserved-booking-requests/reserved-booking-requests.component';
import { PaidBookingRequestsComponent } from './paid-booking-requests/paid-booking-requests.component';
import { FinishedBookingRequestsComponent } from './finished-booking-requests/finished-booking-requests.component';
import { CanceledBookingRequestsComponent } from './canceled-booking-requests/canceled-booking-requests.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';
import { SearchAdResultCardComponent } from './search-ad-result-card/search-ad-result-card.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsListDialogComponent } from './comments-list-dialog/comments-list-dialog.component';


@NgModule({
  declarations: [PendingBookingRequestsComponent, ReservedBookingRequestsComponent,
     PaidBookingRequestsComponent, FinishedBookingRequestsComponent, CanceledBookingRequestsComponent,
      SearchAdsComponent, SearchAdResultCardComponent, CreateCommentComponent, CommentsListDialogComponent],
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
    CanceledBookingRequestsComponent,
    CreateCommentComponent
  ],
  entryComponents: [
    CommentsListDialogComponent
  ]
})
export class SharedModule { }
