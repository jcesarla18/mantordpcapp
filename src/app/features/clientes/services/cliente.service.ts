import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Cliente } from '../models/cliente'
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  // propiedades
  private apiUrl = `${environment.apiUrl}/cliente`
  private httpClient = inject(HttpClient)

  /***metodos***/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getClient(): Observable<Cliente[]> {
    return this.httpClient
      .get<Cliente[]>(this.apiUrl)
      .pipe(catchError(this.errorHandler))
  }

  createClient(client: Cliente): Observable<Cliente> {
    return this.httpClient
      .post<Cliente>(this.apiUrl, client, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getClientById(id: number): Observable<Cliente> {
    return this.httpClient
      .get<Cliente>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler))
  }

  updateClient(id: number, client: Cliente): Observable<Cliente> {
    return this.httpClient
      .put<Cliente>(`${this.apiUrl}/${id}`, client, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  deleteClient(id: number): Observable<void> {
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
