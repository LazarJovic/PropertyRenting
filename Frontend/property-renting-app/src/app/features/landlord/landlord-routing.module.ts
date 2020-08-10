import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { RegisterPropertyComponent } from './register-property/register-property.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { MyAdsComponent } from './my-ads/my-ads.component';


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
        path: 'my-ads',
        component: MyAdsComponent,
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
