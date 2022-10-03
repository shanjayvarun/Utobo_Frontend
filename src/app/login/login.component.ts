import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IsFocusableConfig } from '@angular/cdk/a11y';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  signUpDetails: any;
  loginDetails: any;

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {}

  userSignUp() {
    this.api.signup(this.signUpForm.value).subscribe(
      (res) => {
        this.signUpDetails = res;
        console.log(res);
      },
      (err) => {
        if (
          (err.message =
            'You provided an invalid object where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable')
        ) {
          Swal.fire('OOPS!', 'Missing Inputs for Registration', 'error');
        } else if ((err.message = 'email is already taken')) {
          Swal.fire('OOPS!', 'Email Already Taken', 'error');
        } else {
          console.log("test validation");
        }
      }
    );
  }

  userLogin() {
    this.api.login(this.profileForm.value).subscribe(
      (res) => {
        this.loginDetails = res;
        this.router.navigate(['/imageList']);
        window.localStorage.setItem('token', this.loginDetails.token);
      },
      (err) => {
        if ((err.message = 'Email or password is incorrect')) {
          Swal.fire('OOPS!', 'Email or Password is Incorrect', 'error');
        }
      }
    );
  }
}
