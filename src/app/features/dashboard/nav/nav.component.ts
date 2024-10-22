import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { CommonModule } from '@angular/common'
import { MenuService } from '../../../core/services/menu.service'
import { MenuItem } from '../../../core/models/menu.model'
import { BehaviorSubject } from 'rxjs'
import { UsuarioService } from '../../usuarios/service/usuario.service'
import { TokenService } from '../../../core/services/token.service'

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  private menuService = inject(MenuService)
  private userService = inject(UsuarioService)
  private tokenService = inject(TokenService)

  // propiedades
  menuItemsSubject = new BehaviorSubject<MenuItem[]>([])
  data$ = this.menuItemsSubject.asObservable()
  isAuthenticatedStatus: boolean = false

  userName = signal<string>('Account')
  userEmail = signal<string>('')
  userRol = signal<string>('')
  // metodos

  navigateTo(route: string) {
    this.router.navigate([route])
  }

  logout(): void {
    this.authService.logout()
    this.userName.set('Account')
  }

  dropMenuUser() {
    const { nameid } = this.tokenService.getObjectToken()
    if (nameid != null) {
      this.userService.getUserById(nameid).subscribe(value => {
        const { email, nombre, rol } = value
        this.userName.set(nombre)
        this.userEmail.set(email)
        this.userRol.set(rol ?? '')
      })
    }
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAutenticated => {
      this.isAuthenticatedStatus = isAutenticated
    })

    this.menuService.getDynamicMenu().subscribe(items => {
      const updatedata = [...items]
      this.menuItemsSubject.next(updatedata)
      this.dropMenuUser()
    })
  }

  ngOnDestroy() {
    this.menuItemsSubject.unsubscribe()
    this.userName.set('Account')
  }
  constructor() {}
}
