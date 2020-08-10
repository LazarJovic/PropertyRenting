import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { ChoosePropertyDialogComponent } from './choose-property-dialog/choose-property-dialog.component';
import { MyAdsComponent } from './my-ads/my-ads.component';


@NgModule({
  declarations: [LandlordDashboardComponent, RegisterPropertyComponent, CreateAdComponent, ChoosePropertyDialogComponent, MyAdsComponent],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ChoosePropertyDialogComponent
  ]
})
export class LandlordModule { }
