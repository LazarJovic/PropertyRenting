import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';
import { TenantBookingRequestsComponent } from './tenant-booking-requests/tenant-booking-requests.component';
import { AdDetailsComponent } from '@features/auth/ad-details/ad-details.component';


const routes: Routes = [
  {
    path: '',
    component: TenantDashboardComponent,
    children: [
      {
        path: 'tenant-booking-requests',
        component: TenantBookingRequestsComponent,
        pathMatch: 'full'
      },
      {
        path: 'ad/:id',
        component: AdDetailsComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
