import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";

export class CategoryRequestDto {
name?:string;
description?:string;
}

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  newCategory: CategoryRequestDto = new CategoryRequestDto();

  constructor(
    private categoryService:CategoryService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  onCreate() {
    this.newCategory.name = this.categoryForm.get('title')?.value;
    this.newCategory.description = this.categoryForm.get('description')?.value;

    this.categoryService.createCategory(this.newCategory).subscribe(data=>{
      this.router.navigateByUrl('/');
    })

  }
}
