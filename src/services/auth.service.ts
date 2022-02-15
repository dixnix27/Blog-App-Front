import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequest} from "../app/auth/signup/signupRequest";
import {Observable} from "rxjs";
import {Loginrequest} from "../app/auth/login/loginrequest";
import {Loginresponse} from "../app/auth/login/loginresponse";
import {LocalStorageService} from "ngx-webstorage";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }
  constructor( private http: HttpClient, private localStorage:LocalStorageService) { }

    baseUrl = 'http://localhost:8080/api/';

  signup(request:SignupRequest):Observable<any>{
    return this.http.post(this.baseUrl+'auth/signup',request , { responseType: 'text' })
  }

  login(request:Loginrequest){
    return this.http.post<Loginresponse>(this.baseUrl+'auth/login',request)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken',data.authenticationToken);
        this.localStorage.store('refreshToken',data.refreshToken);
        this.localStorage.store('expiresAt',data.expiresAt);
        this.localStorage.store('username',data.username);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  refreshToken() {
    return this.http.post<Loginresponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
