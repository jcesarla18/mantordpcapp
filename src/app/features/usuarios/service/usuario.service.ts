import { inject, Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Usuario } from '../models/usuario'
import { catchError, Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenService } from '../../../core/services/token.service'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/users`
  private httpClient = inject(HttpClient)
  private tokenService = inject(TokenService)

  /***metodos***/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getUsers(): Observable<Usuario[]> {
    return this.httpClient
      .get<Usuario[]>(this.apiUrl)
      .pipe(catchError(this.errorHandler))
  }

  createUser(user: Usuario): Observable<Usuario> {
    return this.httpClient
      .post<Usuario>(this.apiUrl, user, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getUserById(id: number): Observable<Usuario> {
    return this.httpClient
      .get<Usuario>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler))
  }

  updateUser(id: number, user: Usuario): Observable<Usuario> {
    return this.httpClient
      .put<Usuario>(`${this.apiUrl}/${id}`, user, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getDataUsuario(): Observable<Usuario> {
    const { nameid } = this.tokenService.getObjectToken()
    return this.httpClient
      .get<Usuario>(`${this.apiUrl}/${nameid}`)
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
