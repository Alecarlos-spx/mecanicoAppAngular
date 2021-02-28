import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FramePageComponent } from './pages/master/frame.page';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  {
    path: '',
    component: FramePageComponent,
    canActivate: [AuthService],
  },
  //{path: '', component: FramePageComponent},
  
  {path: 'clientes', component: ClientesPageComponent, canActivate: [AuthService], },
  {path: 'home', component: HomePageComponent, canActivate: [AuthService]},
  
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
