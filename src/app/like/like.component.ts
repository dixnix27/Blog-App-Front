import {Component, Input, OnInit} from '@angular/core';
import {PostDto} from "../dto/post-dto";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() post: PostDto;
  constructor() { }

  ngOnInit(): void {
  }

}
