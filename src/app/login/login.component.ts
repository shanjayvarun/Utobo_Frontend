import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  signUpDetails: any;
  loginDetails : any

  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  profileForm = new FormGroup({
    email: new FormControl('', ),
    password: new FormControl(''),
  });


  ngOnInit() { }

  userSignUp() {

    this.api.signup(this.signUpForm.value).subscribe((res) => {
      this.signUpDetails = res;
      console.log(res)
    });
  }

  userLogin() {

    this.api.login(this.profileForm.value).subscribe((res) => {
      this.loginDetails = res;
      this.router.navigate(['/imageList'])
      console.log(this.loginDetails.token)
      window.localStorage.setItem("token", this.loginDetails.token);


      // if (res) {

      // }
      // if (res) {
      //   Swal.fire(
      //     'Good job!',
      //     'User Created Successfully',
      //     'success'
      //   )
      // } else {
      //   Swal.fire(
      //     'OOPS!',
      //     'User Already Taken',
      //     'error'
      //   )
      // }
    });
  }

  // onSubmit() {
  // }

}
