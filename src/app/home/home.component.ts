import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

posts:PostDto[]=[];
category:number;
user:string;
isLoggedIn :boolean;
  constructor(private postService:PostService,
              private authService:AuthService,
              private activatedRoute:ActivatedRoute) {
    // view by category
    this.category=this.activatedRoute.snapshot.params.id;
    this.user=this.activatedRoute.snapshot.params.username;
  }

  ngOnInit(): void {
    console.log('a')
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);

    if(this.category!=null){
      this.postService.getAllPostsByCategory(this.category).subscribe(resp => {
        this.posts = resp;
      })
    }else if(this.user!=null){
      this.postService.getAllPostsByUser(this.user).subscribe(resp => {
        this.posts = resp;
        console.log(this.posts)
      })
    }
    // view all posts
    else{
      this.postService.getAllPosts().subscribe(resp => {
        this.posts = resp;
      })
    }
  }

}
