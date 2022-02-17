import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "../app/dto/post-dto";
import {PostRequestDto} from "../app/dto/Post-request-dto";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/api/';

  getAllPosts(){
    return this.http.get<PostDto[]>(this.baseUrl+'posts')
  }

  createPost(newPost: PostRequestDto) {
    return this.http.post(this.baseUrl+'posts',newPost)
  }


  getPost(postId: number) {
    return this.http.get<PostDto>(this.baseUrl+'posts/'+postId);
  }

  getAllPostsByUser(name: string) {
    return this.http.get<PostDto[]>(this.baseUrl+'posts/by-user/'+name)
  }
}
