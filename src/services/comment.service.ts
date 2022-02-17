import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryResponse} from "../app/dto/category-response";
import {CommentDto} from "../app/dto/comment-dto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/';

  getComments(postId:number) {
    return this.http.get<CommentDto[]>(this.baseUrl+'comments/by-post/'+postId)
  }

  postComment(comment:CommentDto) {
    return this.http.post<CommentDto[]>(this.baseUrl+'comments',comment);
  }

  getCommentsByUser(name:string) {
    return this.http.get<CommentDto[]>(this.baseUrl+'comments/by-user/'+name)

  }
}
