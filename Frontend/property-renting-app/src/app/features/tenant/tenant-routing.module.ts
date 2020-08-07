import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantDashboardComponent } from './tenant-dashboard/tenant-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: TenantDashboardComponent,
    children: [
      // {
      //   path: 'register-property',
      //   component: RegisterPropertyComponent,
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
