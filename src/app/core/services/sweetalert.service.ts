import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
    });

  }

  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
    });
  }

  async confirm(title:string, text:string):Promise<boolean>{
    return await Swal.fire({
      title,
      text,
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Si',
      cancelButtonText:'No',
    }).then(result => result.isConfirmed);
  }

  accepted(title:string, text:string){
    return Swal.fire(title, text, 'success');
  }

  cancelled(title:string, text:string){
    return Swal.fire(title, text, 'error');
  }

}
