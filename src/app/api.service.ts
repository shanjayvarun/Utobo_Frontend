import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private $http: HttpClient) {}

  handleError(res: any) {
    return throwError(res.error);
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
}
