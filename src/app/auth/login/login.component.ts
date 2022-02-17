import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Loginrequest} from "./loginrequest";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from '@angular/router';
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Loginrequest = new Loginrequest();

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onLogin() {
    this.login.username=this.loginForm.get('username')?.value;
    this.login.password=this.loginForm.get('password')?.value;
    this.authService.login(this.login).subscribe((data => {
      console.log('success')
    }))

    this.authService.login(this.login).subscribe(data=>{
      console.log(data)
      this._snackBar.open('Welcome '+ this.login.username+ '!', "success",{
        horizontalPosition:'right',
        verticalPosition:'top',
        duration:3000
      });
      this.router.navigateByUrl('');
    }, error => {
      this._snackBar.open('Error! Password / User not correct', "error",{
        horizontalPosition:'right',
        verticalPosition:'top',
        duration:3000
      });
    })
  }
}
