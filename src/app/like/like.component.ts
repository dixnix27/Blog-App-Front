import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {LikeService} from "../../services/like.service";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {LikeDto, VoteType} from "../dto/like-dto";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() post: PostDto;
  like:LikeDto = new LikeDto();

  constructor(private likeService:LikeService,
              private authService:AuthService,
              private postService:PostService) { }

  ngOnInit(): void {
  }

  likePost() {
    this.like.voteType=VoteType.UPVOTE;
    this.likeMethod();
  }

  disLikePost() {
    this.like.voteType=VoteType.DOWNVOTE;
    this.likeMethod();
  }

  private likeMethod() {
    this.like.postId = this.post.id;
    this.likeService.like(this.like).subscribe(data=>{
        this.updatePost();
    })
  }

  private updatePost() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    })
  }
}
