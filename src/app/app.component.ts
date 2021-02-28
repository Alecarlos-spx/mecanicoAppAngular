import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MecanicoApp';

mostrarMenu: boolean = false;

constructor(private authService: AuthService) { }

ngOnInit(){
  this.authService.mostrarMenuEmitter.subscribe(
    mostrar => this.mostrarMenu = mostrar
  );
}
    

  // ngOnInit(): void {
  //   this._subscription = this.service.getSituacaoToken().subscribe(a => {
  //       if (this.validaStatus) {
  //         console.log("troca status");
  //           a = !a;
  //       }
  //   });
    
  // }




}
