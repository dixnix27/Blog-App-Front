import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryResponse} from "../app/dto/category-response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/';

  getAllCategories() {
    return this.http.get<CategoryResponse[]>(this.baseUrl+'category')
  }
}
