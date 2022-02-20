import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {CategoryResponse} from "../dto/category-response";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryResponse[] = [];
  displayViewAll: boolean;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe( resp => {
      // if(resp.length>=5){
      //   this.categories = resp.splice(0,4);
      //   this.displayViewAll = true;
      // } else{
        this.categories = resp;
      // }
    });
  }

}
