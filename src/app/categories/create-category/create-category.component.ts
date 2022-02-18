import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private _snackBar: MatSnackBar,
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
      this._snackBar.open('Category created!', "Close",{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:3000
      });
      this.router.navigateByUrl('');
    }, error => {
      this._snackBar.open('Error create category', "error",{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:3000
      });
    })
  }
}
