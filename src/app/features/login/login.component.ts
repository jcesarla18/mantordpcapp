import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)
  private toastr = inject(ToastrService)

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  })
  constructor() {}

  /*----metodos----*/

  public onSubmit() {
    if (this.formLogin.valid) {
      this.authService
        .login(this.formLogin.value.email, this.formLogin.value.password)
        .subscribe({
          next: () => this.router.navigate(['/inicio']),
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.toastr.warning(err.error.message, 'Message')
            }
          },
        })
    } else {
      this.toastr.warning('Ingrese los valores correctos', 'Message')
    }
  }
}
