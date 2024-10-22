import { Routes } from '@angular/router'
import { AuthGuard } from './core/guards/auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'page/home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./features/dashboard/layout/layout.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/login/login.component'),
        // canActivate: [AuthGuard],
      },
      {
        path: 'inicio',
        loadComponent: () => import('./features/inicio/inicio.component'),
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./features/dashboard/configuracion/configuracion.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'page',
        loadChildren: () => import('./pages/pages.routes'),
      },
      {
        path: 'usuario',
        loadChildren: () => import('./features/usuarios/usuarios.routes'),
        canActivate: [AuthGuard],
      },
      {
        path: 'cliente',
        loadChildren: () => import('./features/clientes/clientes.routes'),
        canActivate: [AuthGuard],
      },
      {
        path: 'ordenadores',
        loadChildren: () =>
          import('./features/ordenadores/ordernadores.routes'),
        canActivate: [AuthGuard],
      },
      {
        path: 'citas',
        loadComponent: () => import('./features/citas/citas.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'servicios',
        loadComponent: () => import('./features/servicios/servicios.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'tecnicos',
        loadComponent: () => import('./features/tecnicos/tecnicos.component'),
        canActivate: [AuthGuard],
      },
    ],
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
]
