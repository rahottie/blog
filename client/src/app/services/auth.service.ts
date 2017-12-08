import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private _api: String = 'http://localhost:3000/users'
  authToken: String;

  constructor(private _http: Http) { }

  //register user

  authenticateUser(user) {
    let url = this._api + '/authenticate';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(url, user, { headers: headers }).map(res => res.json());
  }

  //logout
  logout() {
    this.authToken = null;
    localStorage.clear();
  }

  //store token
  storeUserData(token, user) {
    if (token != undefined) {
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', user) //needed?
    }
  }

  // get user
  isLoggedIn() {
    return tokenNotExpired('id_token');
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

}
