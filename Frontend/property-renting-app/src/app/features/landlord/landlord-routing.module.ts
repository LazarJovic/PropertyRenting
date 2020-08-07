import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { RegisterPropertyComponent } from './register-property/register-property.component';


const routes: Routes = [
  {
    path: '',
    component: LandlordDashboardComponent,
    children: [
      {
        path: 'register-property',
        component: RegisterPropertyComponent,
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
