import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostDto} from "../../dto/post-dto";
import {PostRequestDto} from "../../dto/Post-request-dto";
import {CategoryService} from "../../../services/category.service";
import {CategoryResponse} from "../../dto/category-response";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  newPost : PostRequestDto = new PostRequestDto();
  categories : CategoryResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService:CategoryService,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();

  }

   initForm() {
    this.postForm = this.fb.group({
      postName: ['', [Validators.required]],
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]],
    });
     }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(resp =>{
      this.categories = resp;
    })

}
  onCreate() {
    this.newPost.postName = this.postForm.get('postName')?.value;
    this.newPost.categoryName = this.postForm.get('categoryName')?.value;
    this.newPost.description = this.postForm.get('description')?.value;
    this.newPost.url = this.postForm.get('url')?.value;

    this.postService.createPost(this.newPost).subscribe(data => {
      this.router.navigateByUrl('/');
    })

  }
}

