import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private api: ApiService) {}

  signUpDetails: any;

  ngOnInit() {}

  signUp() {
    let signUpDetailsObj = {};
    signUpDetailsObj;

    this.api.signup(signUpDetailsObj).subscribe((res) => {
      this.signUpDetails = res;
    });
  }
}
