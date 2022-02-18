import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {CreateCategoryComponent} from "./categories/create-category/create-category.component";
import {ReadPostComponent} from "./post/read-post/read-post.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {AuthGuard} from "./auth/auth.guard";
import {PostComponent} from "./post/post.component";

const routes: Routes = [
  {path:'sign-up',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'create-post',component:CreatePostComponent, canActivate: [AuthGuard]},
  {path:'create-category',component:CreateCategoryComponent, canActivate: [AuthGuard]},
  {path:'view-post/:id',component:ReadPostComponent},
  {path:'my-profile/:name',component:MyProfileComponent, canActivate: [AuthGuard]},
  {path:'view-category/:id',component:HomeComponent},
  {path:'by-user/:username',component:HomeComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
