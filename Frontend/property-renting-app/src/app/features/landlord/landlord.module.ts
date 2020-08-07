import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [LandlordDashboardComponent, RegisterPropertyComponent],
  imports: [
    CommonModule,
    LandlordRoutingModule,
    SharedModule
  ]
})
export class LandlordModule { }
