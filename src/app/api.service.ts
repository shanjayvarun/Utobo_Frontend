import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private router: Router, private $http: HttpClient) {}

  handleError(res: any) {
    return res.error;
  }

  getHeaders() {
    var token: any = {};
    token = localStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };

    return headers;
  }

  login(data: any) {
    return this.$http
      .post(`http://localhost:4000/users/authenticate`, data)
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

  signup(data: any) {
    return this.$http.post(`http://localhost:4000/users/register`, data).pipe(
      map((response: any) => response.data),
      catchError(this.handleError)
    );
  }

  getAll() {
    return this.$http
      .get(`http://localhost:4000/images/getAllImages`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }

  deleteId(id: any) {
    //console.log("service id", id)
    return this.$http
      .delete(`http://localhost:4000/images/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response: any) => response.data),
        catchError(this.handleError)
      );
  }
}
