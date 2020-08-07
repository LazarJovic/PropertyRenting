import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './root/app.component';
import { LoginComponent } from '../features/auth/login/login.component';
import { RegisterComponent } from '../features/auth/register/register.component';
import { LandingPageComponent } from '@features/auth/landing-page/landing-page.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'landlord',
    loadChildren: () => import('@features/landlord/landlord.module').then(m => m.LandlordModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('@features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'tenant',
    loadChildren: () => import('@features/tenant/tenant.module').then(m => m.TenantModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule { }
