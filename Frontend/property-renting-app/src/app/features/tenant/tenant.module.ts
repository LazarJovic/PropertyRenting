import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantBookingRequestsComponent } from './tenant-booking-requests/tenant-booking-requests.component';


@NgModule({
  declarations: [TenantDashboardComponent, TenantBookingRequestsComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    SharedModule
  ]
})
export class TenantModule { }
