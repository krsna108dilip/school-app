import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { School } from '../_models/School';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentSchoolSubject: BehaviorSubject<School>;
  public currentSchool: Observable<School>;
  private refreshTokenTimeout;

  private schoolObject: School[] = [
{
  jwtToken: '',
   school: [{id: 1, name: 'Test School', address: 'Kukatpally, Hyderabad - 500072',
    mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
    userList: [{ id : 1, username: 'Admin1234', password : 'Admin1234', lastlogin : '',
    role: [{
      id: 1,
      rolename: 'Admin'
    }]
  }]
  }]
},
{
  jwtToken: '',
   school: [{id: 2, name: 'Test School2', address: 'Kukatpally, Hyderabad - 500072',
    mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
    userList: [{ id : 1, username: 'Admin1234', password : 'Admin1234', lastlogin : '',
    role: [{
      id: 1,
      rolename: 'Admin'
    }]
  }]
  }]
}
];

constructor(private http: HttpClient) {
  this.currentSchoolSubject = new BehaviorSubject<School>(
    JSON.parse(sessionStorage.getItem('currentSchool')));
  this.currentSchool = this.currentSchoolSubject.asObservable();
}

public get currentSchoolValue(): School {
  return this.currentSchoolSubject.value;
}

login(username, password) {

return this.http.post<any>(`${environment.apiUrl}schoolUsers/userCheck`,
  {username, password})
  .pipe(map(school => {
    if (school) {
      sessionStorage.setItem('currentSchool', JSON.stringify(school));
      this.currentSchoolSubject.next(school);
    }
    else
    {
      return school;
    }
  }));

  // if (this.schoolObject.some(s => s.userList[0].username === username)) {
  //   const school = this.schoolObject.find(s => s.userList[0].username === username &&
  //     s.userList[0].password === password);
  //   console.log(school);
  //   sessionStorage.setItem('currentSchool', JSON.stringify(school));
  //   this.currentSchoolSubject.next(school);
  //   this.startRefreshTokenTimer();
  //   return school as School;

  // }
  // else
  // return null;



}

logout() {
  this.stopRefreshTokenTimer();
  sessionStorage.removeItem('currentSchool');
  this.currentSchoolSubject.next(null);
}

refreshToken() {
  return this.http.post<any>(`${environment.apiUrl}schoolUsers/refresh-token`, {})
      .pipe(map((school) => {
          this.currentSchoolSubject.next(school);
          this.startRefreshTokenTimer();
          return school;
      }));
}

private startRefreshTokenTimer() {
  const jwtToken = JSON.parse(atob(this.currentSchoolValue.jwtToken.split('.')[1]));

  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() -  Date.now() - (60 * 2000);

  this.refreshTokenTimeout = setTimeout( () => this.refreshToken().subscribe(), timeout);

}

private stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);
}

}
