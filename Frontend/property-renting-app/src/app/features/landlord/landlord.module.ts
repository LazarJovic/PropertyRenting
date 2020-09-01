import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { ChoosePropertyDialogComponent } from './choose-property-dialog/choose-property-dialog.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { LandlordBookingRequestsComponent } from './landlord-booking-requests/landlord-booking-requests.component';
import { PropertyStatsComponent } from './property-stats/property-stats.component';
import { ChoosePropertyCardComponent } from './choose-property-card/choose-property-card.component';
import { AuthModule } from '@features/auth/auth.module';
import { MyPropertiesComponent } from './my-properties/my-properties.component';


@NgModule({
  declarations: [LandlordDashboardComponent, RegisterPropertyComponent, CreateAdComponent, ChoosePropertyDialogComponent,
     MyAdsComponent, LandlordBookingRequestsComponent, PropertyStatsComponent, ChoosePropertyCardComponent, MyPropertiesComponent],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    SharedModule,
    AuthModule
  ],
  entryComponents: [
    ChoosePropertyDialogComponent
  ]
})
export class LandlordModule { }
