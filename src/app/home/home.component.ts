import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();

posts:PostDto[]=[];
isLoggedIn :boolean;
  constructor(private postService:PostService,
              private authService:AuthService) {
    this.postService.getAllPosts().subscribe(resp => {
      this.posts = resp;
    })
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);
  }

}
