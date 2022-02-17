import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryResponse} from "../app/dto/category-response";
import {CategoryRequestDto} from "../app/categories/create-category/create-category.component";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/';

  getAllCategories() {
    return this.http.get<CategoryResponse[]>(this.baseUrl+'category')
  }

  createCategory(newCategory: CategoryRequestDto) {
    return this.http.post(this.baseUrl+'category',newCategory)
  }
}
