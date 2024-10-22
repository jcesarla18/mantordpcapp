import { inject, Injectable } from '@angular/core'
import { jwtDecode } from 'jwt-decode'
import { RolService } from './rol.service'

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // propiedades
  private rolService = inject(RolService)
  private tokenKey = 'authToken'

  constructor() {}

  // metodos

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  checkToken(): boolean {
    const token = this.getToken() ?? ''
    if (!token) {
      return false
    } else {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const exp = payload.exp * 1000
      return Date.now() < exp
    }
  }

  getRolNameToken() {
    const token = this.getToken()
    if (token != null) {
      const data: any = jwtDecode(token ?? '')
      this.rolService.setCurrentRol(data.role)
    }
  }
  getObjectToken(): any {
    const token = this.getToken()
    if (token !== null) {
      const data: any = jwtDecode(token ?? '')
      return data
    } else {
      return { nameid: null }
    }
  }
}
