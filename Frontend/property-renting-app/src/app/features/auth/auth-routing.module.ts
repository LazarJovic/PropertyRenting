import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingCarouselComponent } from '@features/auth/landing-carousel/landing-carousel.component';
import { VerifyComponent } from './verify/verify.component';
import { SearchAdsComponent } from '@shared/search-ads/search-ads.component';
import { AdDetailsComponent } from '@features/auth/ad-details/ad-details.component';
import { LandlordGuard } from '@shared/guard/landlord.guard';
import { AdminGuard } from '@shared/guard/admin.guard';
import { TenantGuard } from '@shared/guard/tenant.guard';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: LandingCarouselComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
      },
      {
        path: 'verify',
        component: VerifyComponent,
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchAdsComponent,
        pathMatch: 'full'
      },
      {
        path: 'ad/:id',
        component: AdDetailsComponent,
        pathMatch: 'full'
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

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
