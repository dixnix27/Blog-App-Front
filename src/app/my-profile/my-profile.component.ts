import { Component, OnInit } from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {CommentDto} from "../dto/comment-dto";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  name: string;
  posts: PostDto[];
  comments: CommentDto[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute:ActivatedRoute,private postService:PostService,
              private commentService:CommentService) {
    this.name=this.activatedRoute.snapshot.params.name;
    postService.getAllPostsByUser(this.name).subscribe( data => {
      this.posts = data;
      this.postLength = data.length;
    })
  }

  ngOnInit(): void {
    this.getComments();
  }

    getComments(){
    this.commentService.getCommentsByUser(this.name).subscribe( data=>{
      this.comments = data;
      this.commentLength = data.length;
    })
    }
}
