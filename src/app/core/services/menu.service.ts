import { inject, Injectable } from '@angular/core'
import { MenuItem } from '../models/menu.model'
import { AuthService } from './auth.service'
import { RolService } from './rol.service'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { TokenService } from './token.service'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // inject
  private rolService = inject(RolService)
  private tokenService = inject(TokenService)
  // propiedades
  private dynamicMenuSubject = new BehaviorSubject<MenuItem[]>([])

  // lista menus
  private menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'home',
      route: 'page/home',
      icon: 'bi bi-house',
      roles: ['default'],
    },
    {
      id: 2,
      label: 'nosotros',
      route: 'page/nosotros',
      icon: 'bi bi-building',
      roles: ['default'],
    },
    {
      id: 3,
      label: 'productos',
      route: 'page/productos',
      icon: 'bi bi-pc-display',
      roles: ['default'],
    },
    {
      id: 4,
      label: 'contactos',
      route: 'page/contactos',
      icon: 'bi bi-person-rolodex',
      roles: ['default'],
    },
    {
      id: 0,
      label: 'inicio',
      route: '/inicio',
      icon: 'bi bi-house',
      roles: ['admin', 'user'],
    },
    {
      id: 5,
      label: 'usuarios',
      route: '/usuario',
      icon: 'bi bi-people-fill',
      roles: ['admin'],
    },
    {
      id: 6,
      label: 'clientes',
      route: '/cliente',
      icon: 'bi bi-person-badge',
      roles: ['admin'],
    },
    {
      id: 7,
      label: 'ordenadores',
      route: '/ordenadores',
      icon: 'bi bi-motherboard',
      roles: ['admin', 'user'],
    },
    {
      id: 8,
      label: 'servicios',
      route: '/servicios',
      icon: 'bi bi-tools',
      roles: ['admin', 'user'],
    },
    {
      id: 9,
      label: 'citas',
      route: '/citas',
      icon: 'bi bi-calendar',
      roles: ['Admin', 'user'],
    },
    {
      id: 10,
      label: 'tecnicos',
      route: '/tecnicos',
      icon: 'bi bi-person-vcard-fill',
      roles: ['admin'],
    },
  ]

  // metodos
  getDynamicMenu(): Observable<MenuItem[]> {
    return this.dynamicMenuSubject.asObservable()
  }

  private filterMenuItemsByRol(rol: string): MenuItem[] {
    return this.menuItems
      .filter(role => role.roles.includes(rol ?? ''))
      .map((item: MenuItem) => ({
        ...item,
      }))
  }

  constructor() {
    this.tokenService.getRolNameToken()
    this.rolService
      .getCurrentRol()
      .pipe(map(rol => this.filterMenuItemsByRol(rol ?? '')))
      .subscribe(filteredMenu => {
        this.dynamicMenuSubject.next(filteredMenu)
      })
  }
}
