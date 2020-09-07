import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './root/app.component';
import { LoginComponent } from '../features/auth/login/login.component';
import { RegisterComponent } from '../features/auth/register/register.component';
import { LandingPageComponent } from '@features/auth/landing-page/landing-page.component';
import { AdminGuard } from '@shared/guard/admin.guard';
import { TenantGuard } from '@shared/guard/tenant.guard';
import { LandlordGuard } from '@shared/guard/landlord.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'landlord',
    loadChildren: () => import('@features/landlord/landlord.module').then(m => m.LandlordModule),
    canActivate: [
      LandlordGuard
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('@features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [
      AdminGuard
    ],
  },
  {
    path: 'tenant',
    loadChildren: () => import('@features/tenant/tenant.module').then(m => m.TenantModule),
    canActivate: [
      TenantGuard
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocksRoutingModule { }
