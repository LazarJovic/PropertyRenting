import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { SharedModule } from '@shared/shared.module';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';


@NgModule({
  declarations: [TenantDashboardComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    SharedModule
  ]
})
export class TenantModule { }
