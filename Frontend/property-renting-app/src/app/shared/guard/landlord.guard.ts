import { AuthTokenService } from '@core/service/auth-token-service/auth-token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LandlordGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthTokenService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.loggedUser.value) {
      if (this.authService.loggedUser.value.role === 'ROLE_LANDLORD') {
        return true;
      } else if (this.authService.loggedUser.value.role === 'ROLE_TENANT') {
        const nav = this.router.getCurrentNavigation();
        try {
          const param1: string = nav.finalUrl.root.children.primary.segments[1].path;
          const param2: string = nav.finalUrl.root.children.primary.segments[2].path;
          if (param1 === 'ad') {
            this.router.navigate([`/tenant-dashboard/ad/${param2}`]);
            return false;
          }
        } catch (error) {}
        this.router.navigate([`/tenant-dashboard`]);
        return false;
      } else if (this.authService.loggedUser.value.role === 'ROLE_ADMIN') {
        const nav = this.router.getCurrentNavigation();
        try {
          const param1: string = nav.finalUrl.root.children.primary.segments[1].path;
          const param2: string = nav.finalUrl.root.children.primary.segments[2].path;
          if (param1 === 'ad') {
            this.router.navigate([`/admin-dashboard/ad/${param2}`]);
            return false;
          }
        } catch (error) {}
        this.router.navigate([`/admin-dashboard`]);
        return false;
      }

      this.router.navigate(['']);
      return false;

    } else {
      const nav = this.router.getCurrentNavigation();
      try {
        const param1: string = nav.finalUrl.root.children.primary.segments[1].path;
        const param2: string = nav.finalUrl.root.children.primary.segments[2].path;
        if (param1 === 'ad') {
          this.router.navigate([`/ad/${param2}`]);
          return false;
        }
      } catch (error) {}
      this.router.navigate(['']);
      return false;
    }
  }
}
