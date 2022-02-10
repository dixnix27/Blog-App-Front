import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignupRequest} from "./signupRequest";
import {AuthService} from "../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  singup : SignupRequest = new SignupRequest();
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSignup() {
    this.singup.username=this.signUpForm.get('username')?.value;
    this.singup.email=this.signUpForm.get('email')?.value;
    this.singup.password=this.signUpForm.get('password')?.value;

    this.authService.signup(this.singup).subscribe(data=>{
    console.log(data)
      this._snackBar.open('User Registred Succesfully', "success",{
        horizontalPosition:'right',
        verticalPosition:'top',
        duration:3000
      });
    }, error => {
      this._snackBar.open('Error registrating user', "error",{
        horizontalPosition:'right',
        verticalPosition:'top',
        duration:3000
      });
    })
  }
}

