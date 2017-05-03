import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import {SERVER} from '../server';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  storeIdentity(): Observable<boolean> {
    return this.http.get(SERVER + '/login').map((response: Response) => {
      try {
        localStorage.setItem('currentUser', JSON.stringify(response.json()));
        return true;
      }catch (e) {
        return false;
      }
    });
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    window.location.href = SERVER.match('http(s)?:\/\/[^\/]*')[0] + '/Shibboleth.sso/Logout';
  }

  getRoles(): any {
    return localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')).roles : [];
  }
}
