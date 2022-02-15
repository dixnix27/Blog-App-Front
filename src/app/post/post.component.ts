import { Component, OnInit } from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: PostDto[] = [];
  constructor(private postService:PostService) {

  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(resp => {
      this.posts = resp;
    })
  }
}
