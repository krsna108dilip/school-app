import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../_services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService : AuthenticationService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const currentSchool = this.authenticationService.currentSchoolValue;
    const isLogginIn = currentSchool && currentSchool.jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if(isLogginIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization:`Bearer ${currentSchool.jwtToken}`
        }
      });
    }
    return next.handle(request);
  }
}
