export class FakeBackend {
}
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { School } from '../_models/School';
import { Roles } from '../_models/Roles';
import { UrlSegment } from '@angular/router';

// const users: User[] = [
//     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
// ];

const schoolObject: School[] = [
  {id: 1, name: 'User1234', address: 'Kukatpally, Hyderabad - 500072',
  mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
  schoolname: 'Bhasyam School',
  usersList: [{ userid: 1,  username: 'User1234', password: 'User1234',
  lastlogin: '',
    role: [{ roleid: 1, rolename: 'User'}],
  }],
  jwtToken: '',

},
  {id: 2, name: 'Admin1234', address: 'Kukatpally, Hyderabad - 500072',
  mobileno: 9874563210, email: 'test@gmail.com', phoneno: 12345678,
   schoolname: 'Bhasyam School',
   usersList: [{ userid: 1, username: 'Admin1234', password: 'Admin1234',
    lastlogin: '',
    role: [{ roleid: 2, rolename: 'Admin'}],
  }],
  jwtToken: '',

  },
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            // call materialize and dematerialize to ensure delay even if
            //an error is thrown (https://github.com/Reactive-Extensions/RxJS/
            //issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = schoolObject.find(x => x.usersList[0].username === username &&
              x.usersList[0].password === password );
            if (!user) return error('Username or password is incorrect');
            return ok({
              id: user.id,
              name: user.name,
              address: user.address,
              mobileno: user.mobileno,
              email: user.email,
              phoneno: user.phoneno,

              schoolname: user.schoolname,
              usersList: {
                userid: user.usersList[0].userid,
                username: user.usersList[0].username,
                password: '',
                lastlogin: '',
                role: {
                  roleid: user.usersList[0].role[0].roleid,
                  rolename: user.usersList[0].role[0].rolename,
                }

              }
                // id: user.id,
                // name: user.name,
                // firstName: user.firstName,
                // lastName: user.lastName,
                // role: user.role,
                // token: `fake-jwt-token.${user.id}`
            });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(schoolObject);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = schoolObject.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().usersList[0].role[0].rolename === Roles.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return schoolObject.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
