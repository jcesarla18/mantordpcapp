import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.apiUrl;
  private http = inject(HttpClient);

  getDate(endpoint: string, data: any): Observable<any> {
    return this.http.get(`${this.apiURL}/${endpoint}`, data)
      .pipe(catchError(this.handleError)
      );
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/${endpoint}`, data)
    .pipe( catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(()=> errorMessage);
  }
}
