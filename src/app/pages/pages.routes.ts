import { Routes } from "@angular/router"

export default [
  {
    path:'home',
    loadComponent: ()=> import('./home/home.component')
  },
  {
    path:'contactos',
    loadComponent: ()=> import('./contactos/contactos.component')
  },
  {
    path:'productos',
    loadComponent: ()=> import('./productos/productos.component')
  },
  {
    path:'nosotros',
    loadComponent: ()=> import('./nosotros/nosotros.component')
  },
] as Routes
