import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../_models/user';

import {config} from '../app.config'

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/authenticate`, {email: email, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('currentUser');
    }
    return this.token;
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
}
