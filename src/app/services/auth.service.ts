import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../util/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter : EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router) { }

  canActivate() {
    const token = SecurityService.hasToken();
    if(!token) {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
        this.router.navigate(['/login']);
        return false;
      }
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);

    return true;
}
}
