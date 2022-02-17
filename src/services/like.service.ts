import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LikeDto} from "../app/dto/like-dto";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/';

  like(like:LikeDto){
    return this.http.post(this.baseUrl+'votes',like);
  }
}
