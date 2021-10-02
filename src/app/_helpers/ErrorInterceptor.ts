import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "../_services/alert.service";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService
  ){
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if([401, 403].includes(err.status) && this.authService.currentSchoolValue) {
        this.authService.logout();
      }
      const error = (err && err.error && err.error.message) || err.statusText;
      if (error != null || error != undefined) {
        this.alertService.Error(error);
      }
      else {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          this.alertService.Error(`${err.error.message}`);
        }
      }
      console.error('Error: ' + error);
      return throwError(error);
      }))
  }
}
