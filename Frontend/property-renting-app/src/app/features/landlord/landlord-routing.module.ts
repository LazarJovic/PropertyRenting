import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { LandlordBookingRequestsComponent } from './landlord-booking-requests/landlord-booking-requests.component';
import { PropertyStatsComponent } from './property-stats/property-stats.component';
import { AdDetailsComponent } from '@features/auth/ad-details/ad-details.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';


const routes: Routes = [
  {
    path: '',
    component: LandlordDashboardComponent,
    children: [
      {
        path: 'register-property',
        component: RegisterPropertyComponent,
        pathMatch: 'full'
      },
      {
        path: 'create-ad',
        component: CreateAdComponent,
        pathMatch: 'full'
      },
      {
        path: 'my-properties',
        component: MyPropertiesComponent,
        pathMatch: 'full'
      },
      {
        path: 'my-ads',
        component: MyAdsComponent,
        pathMatch: 'full'
      },
      {
        path: 'landlord-booking-requests',
        component: LandlordBookingRequestsComponent,
        pathMatch: 'full'
      },
      {
        path: 'property-stats',
        component: PropertyStatsComponent,
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
export class LandlordRoutingModule { }
