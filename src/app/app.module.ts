import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import { SignupComponent } from './auth/signup/signup.component';
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./TokenInterceptor";
import { PostComponent } from './post/post.component';
import { LikeComponent } from './like/like.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CategoriesComponent } from './categories/categories.component';
import {MatChipsModule} from "@angular/material/chips";
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    LikeComponent,
    SideBarComponent,
    CategoriesComponent,
    CreatePostComponent,
    CreateCategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxWebstorageModule.forRoot(),
    MatChipsModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
