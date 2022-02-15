import { Component, OnInit } from '@angular/core';
import {PostDto} from "../dto/post-dto";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
