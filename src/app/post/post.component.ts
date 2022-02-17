import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() posts: PostDto[];
  constructor(private router:Router) {

  }

  ngOnInit(): void {

  }

  goToPost(id: number) {
    this.router.navigateByUrl('/view-post/'+id);
  }
}
