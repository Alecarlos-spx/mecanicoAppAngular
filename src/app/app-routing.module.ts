import { VeiculoPageComponent } from 'src/app/pages/veiculos/veiculo-page/veiculo-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListPageComponent } from './pages/clientes/cliente-list-page/cliente-list-page.component';
import { ClientesPageComponent } from './pages/clientes/clientes-page/clientes-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FramePageComponent } from './pages/master/frame.page';
import { VeiculoListPageComponent } from './pages/veiculos/veiculo-list-page/veiculo-list-page.component';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    canActivate: [AuthService],
  },
  {path: '', component: FramePageComponent},

  {path: 'clientes', canActivate: [AuthService],
    children: [
      {path: '', component: ClienteListPageComponent},
      {path: ':id', component: ClientesPageComponent},
      {path: 'cadastro', component: ClientesPageComponent},

    ]},
  {path: 'veiculos', canActivate: [AuthService],
    children: [
      {path: '', component: VeiculoListPageComponent},
      {path: ':id', component: VeiculoPageComponent},
      {path: 'cadastro',
        children: [
         {path: '', component: VeiculoPageComponent},
         {path: ':idCliente', component: VeiculoPageComponent}
        ]
      }
    ]},


  {path: 'login',  component: LoginPageComponent},
  // {
  //   path:"clientes",
  //   component: FramePageComponent,
  //   //canActivate: [AuthService],
  //   children: [
  //     { path: '',  component: ClientesPageComponent}

  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
