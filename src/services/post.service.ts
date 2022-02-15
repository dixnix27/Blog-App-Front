import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "../app/dto/post-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/';

  getAllPosts(){
    return this.http.get<PostDto[]>(this.baseUrl+'posts')
  }
}
