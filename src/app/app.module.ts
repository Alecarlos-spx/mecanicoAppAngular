import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { DataService } from './services/data.service';
import { FramePageComponent } from './pages/master/frame.page';
import { AuthService } from './services/auth.service';
import { ClientesPageComponent } from './pages/clientes-page/clientes-page.component';


import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidenavListComponent } from './components/shared/navigation/sidenav-list/sidenav-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ToastrModule } from 'ngx-toastr';
import { MaskDirective } from './directives/mask.directive';

@NgModule({
  declarations: [
    MaskDirective,
    AppComponent,
    FramePageComponent,
    LoginPageComponent,
    NavBarComponent,
    ClientesPageComponent,
    SidenavListComponent,
    HomePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ToastrModule.forRoot()
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
