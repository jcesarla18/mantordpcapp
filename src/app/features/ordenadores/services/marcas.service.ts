import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  listaMarcasOrdenadores = [
    {
      name: 'Apple',
      products: ['MacBook', 'iMac', 'Mac Mini', 'Mac Pro'],
    },
    {
      name: 'Dell',
      products: ['XPS', 'Inspiron', 'Alienware', 'Latitude'],
    },
    {
      name: 'HP',
      products: ['Spectre', 'Envy', 'Pavilion', 'Omen', 'EliteBook'],
    },
    {
      name: 'Lenovo',
      products: ['ThinkPad', 'Yoga', 'Legion', 'IdeaPad'],
    },
    {
      name: 'ASUS',
      products: ['ROG', 'ZenBook', 'VivoBook', 'TUF'],
    },
    {
      name: 'Acer',
      products: ['Aspire', 'Predator', 'Swift', 'Nitro'],
    },
    {
      name: 'Microsoft',
      products: [
        'Surface Pro',
        'Surface Laptop',
        'Surface Studio',
        'Surface Go',
      ],
    },
    {
      name: 'MSI',
      products: ['GE Raider', 'GS Stealth', 'GF Thin', 'Creator'],
    },
    {
      name: 'Razer',
      products: ['Razer Blade', 'Razer Book', 'Razer Core'],
    },
    {
      name: 'Samsung',
      products: ['Galaxy Book', 'Notebook', 'Chromebook'],
    },
    {
      name: 'Huawei',
      products: ['MateBook', 'MateStation'],
    },
  ]
  constructor() {}
}
