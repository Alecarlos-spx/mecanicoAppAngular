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

import { ToastrModule } from 'ngx-toastr';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MaterialModule } from './modulo/material/material.module';
import { SharedModule } from './components/shared/shared.module';

import { SidenavListComponent } from './components/shared/navigation/sidenav-list/sidenav-list.component';
import { CadastroModule } from './modulo/cadastro/cadastro.module';





export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AppComponent,
    FramePageComponent,
    LoginPageComponent,
    NavBarComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    CadastroModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(options)
  ],
  entryComponents: [],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
