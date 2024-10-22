import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { RolService } from './rol.service'
import { TokenService } from './token.service'
import { Usuario } from '../../features/usuarios/models/usuario'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  // inject
  private httpClient = inject(HttpClient)
  private router = inject(Router)
  private rolService = inject(RolService)
  private tokenService = inject(TokenService)

  // propiedades
  #httpUrl = environment.apiUrl
  private LOGIN_URL = `${this.#httpUrl}/authenticacion`

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  // metodos
  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          this.tokenService.setToken(response.token)
          this.tokenService.getRolNameToken()
          this.updateAuthenticationStatus(true)
        }
      })
    )
  }

  checkPassword(usuario: Usuario): Observable<any> {
    return this.httpClient
      .post<boolean>(
        `${this.LOGIN_URL}/${usuario.usuarioId}`,
        usuario,
        this.httpOptions
      )
      .pipe(
        tap(response => {
          return response
        })
      )
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  //actualizar estado de authenticacion
  updateAuthenticationStatus(isAuthenticated: boolean) {
    this.isAuthenticatedSubject.next(isAuthenticated)
  }

  //verificar estado de autenticacion
  chechAuthenticationStatus() {
    const token = this.tokenService.checkToken()
    if (token) {
      this.updateAuthenticationStatus(true)
    } else {
      this.updateAuthenticationStatus(false)
    }
  }

  //cerrar session
  logout(): void {
    this.updateAuthenticationStatus(false)
    this.tokenService.removeToken()
    this.rolService.delCurrenRol()
    this.router.navigate(['page/home'])
  }
  constructor() {
    this.chechAuthenticationStatus()
  }

  ngOnDestroy() {
    this.isAuthenticatedSubject.unsubscribe()
  }
}
