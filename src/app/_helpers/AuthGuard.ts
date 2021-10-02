import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentSchool = this.authService.currentSchoolValue;
    if (currentSchool) {
      if (route.data) {
        if (route.data.roles.some(r => r === currentSchool.school[0].userList[0].role[0].rolename)) {
          return true;
        }
        else {
          this.alertService.Error('Unauthorized to view this page');
          return false;
        }

      }
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
    return false;
  }



}
