import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequest} from "../app/auth/signup/signupRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

    baseUrl = 'http://localhost:8080/api/';

  signup(request:SignupRequest):Observable<any>{
    return this.http.post(this.baseUrl+'auth/signup',request , { responseType: 'text' })
  }

}
