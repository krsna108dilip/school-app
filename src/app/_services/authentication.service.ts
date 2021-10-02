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
    {id: 1, name: 'User1234', address: 'Kukatpally, Hyderabad - 500072',
    mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
    schoolname: 'Bhasyam School',
    usersList: [{ userid: 1, username: 'User1234', password: 'User1234',
    lastlogin: '',
      role: [{ roleid: 1, rolename: 'User'}]
    }],
    jwtToken: '',
    jwtToken
  },
    {id: 2, name: 'Admin1234', address: 'Kukatpally, Hyderabad - 500072',
    mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
     schoolname: 'Bhasyam School',
     usersList: [{ userid: 1, username: 'Admin1234', password: 'Admin1234',
      lastlogin: '',
      role: [{ roleid: 2, rolename: 'Admin'}]
    }],
    jwtToken: '',

    },
  ]

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
      sessionStorage.setItem('currentUser', JSON.stringify(school));
      this.currentUserSubject.next(school);
    }
    else
    {
      return school;
    }
  }));

  if (this.schoolObject.some(s => s.name === username)) {
    const school = this.schoolObject.find(s => s.usersList[0].username === username &&
      s.usersList[0].password === password);
    console.log(school);
    sessionStorage.setItem('currentSchool', JSON.stringify(school));
    this.currentSchoolSubject.next(school);
    this.startRefreshTokenTimer();
    return school as School;

  }
  else
  return null;
  // throwError 'Username or password is invalid';



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

private stopRefreshTokenTimer(){
  clearTimeout(this.refreshTokenTimeout);
}





}
