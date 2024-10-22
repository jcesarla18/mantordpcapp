import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { Ordenadores } from '../models/ordenadores'

@Injectable({
  providedIn: 'root',
})
export class OrdenadoresService {
  // propiedades
  private apiUrl = `${environment.apiUrl}/ordenadores`
  private httpClient = inject(HttpClient)

  /***metodos***/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getOrdenadores(): Observable<Ordenadores[]> {
    return this.httpClient
      .get<Ordenadores[]>(this.apiUrl)
      .pipe(catchError(this.errorHandler))
  }

  createOrdenadores(ordenadores: Ordenadores): Observable<Ordenadores> {
    return this.httpClient
      .post<Ordenadores>(this.apiUrl, ordenadores, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getOrdenadoresById(id: number): Observable<Ordenadores> {
    return this.httpClient
      .get<Ordenadores>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler))
  }

  updateOrdenadores(
    id: number,
    ordenadores: Ordenadores
  ): Observable<Ordenadores> {
    return this.httpClient
      .put<Ordenadores>(`${this.apiUrl}/${id}`, ordenadores, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  deleteOrdenadores(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: any) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(() => errorMessage)
  }

  constructor() {}
}
