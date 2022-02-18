import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean;
  username: string;
  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar,
  ) {
    this.authService.username.subscribe((data:string) => this.username = data);
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);

    if(authService.getUserName()!=null){
     this.username=authService.getUserName();
     this.isLoggedIn=true;
   }else {this.isLoggedIn=false}
  console.log(this.isLoggedIn)}
  ngOnInit(): void {
    console.log(this.isLoggedIn);
  }

  goToMyProfile() {
    this.router.navigateByUrl('/my-profile/'+this.username);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    window.location.reload();
  }

  onSearch(s:string) {
    console.log(s)
    // this.router.navigateByUrl('/by-user/'+s);
  }
}
