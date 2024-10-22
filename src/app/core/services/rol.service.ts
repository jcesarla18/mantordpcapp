import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  // propiedades
  private currentRolSubject = new BehaviorSubject<string | null>('default');
  // metodos

  getCurrentRol(): Observable<string | null> {
    return this.currentRolSubject.asObservable();
  }
  setCurrentRol(role: string): void {
    this.currentRolSubject.next(role);
  }
  delCurrenRol(): void {
    this.currentRolSubject.next('default');
  }
  constructor() {
    this.currentRolSubject.asObservable();
  }
}
