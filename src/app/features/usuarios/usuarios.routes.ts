import { Routes } from "@angular/router"

export default [

  { path: '',
    loadComponent: () => import('./components/index/index.component')
  },
  { path: 'create',
    loadComponent: () => import('./components/create/create.component')
  },
  { path: 'edit/:id',
    loadComponent: () => import('./components/edit/edit.component')
  },
  { path: 'view/:id',
    loadComponent: () => import('./components/view/view.component')
  }
] as Routes
