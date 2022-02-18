import { Component, OnInit } from '@angular/core';
import {PostDto} from "../../dto/post-dto";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentDto} from "../../dto/comment-dto";
import {CommentService} from "../../../services/comment.service";
import {throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-read-post',
  templateUrl: './read-post.component.html',
  styleUrls: ['./read-post.component.css']


})


export class ReadPostComponent implements OnInit {
  post: PostDto;
  postId:number;
  commentForm: FormGroup;
  comment:CommentDto = new CommentDto();
  comments:CommentDto[];

  constructor(private postService:PostService,
              private activateRoute:ActivatedRoute,
              private fb:FormBuilder,
              private commentService:CommentService,
              private _snackBar: MatSnackBar,
  ) {
    this.postId = activateRoute.snapshot.params.id;
    postService.getPost(this.postId).subscribe(r=>{
      this.post=r;
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.getComments();
  }

initForm(){
  this.commentForm = this.fb.group({
    text: [''],
  });
}

    postComment() {
      this.comment.text = this.commentForm.get('text')?.value;
      this.comment.postId = this.postId;
      this.commentService.postComment(this.comment).subscribe(data => {
        this.commentForm.get('text')?.setValue('');
        this.getComments();
        this._snackBar.open('Comment posted!', "Close",{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:3000
        });
      }, error => {
        this._snackBar.open('Error post comment', "error",{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:3000
        });
      })

  }

  getComments(){
    this.commentService.getComments(this.postId).subscribe(data => {
      this.comments = data;
    })
  }

}
