import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {CreateCategoryComponent} from "./categories/create-category/create-category.component";

const routes: Routes = [
  {path:'sign-up',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'create-post',component:CreatePostComponent},
  {path:'create-category',component:CreateCategoryComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
