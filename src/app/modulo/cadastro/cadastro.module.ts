import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPageComponent } from 'src/app/pages/clientes/clientes-page/clientes-page.component';
import { CamposModule } from 'src/app/components/shared/campos/campos.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  NgxMaskModule } from 'ngx-mask';
import { VeiculoListPageComponent } from 'src/app/pages/veiculos/veiculo-list-page/veiculo-list-page.component';
import { VeiculoPageComponent } from 'src/app/pages/veiculos/veiculo-page/veiculo-page.component';
import { ClienteListPageComponent } from 'src/app/pages/clientes/cliente-list-page/cliente-list-page.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ClientesPageComponent,
    VeiculoListPageComponent,
    VeiculoPageComponent,
    ClienteListPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CamposModule,
    MaterialModule,
    NgxMaskModule.forChild()

  ],
  exports: []
})
export class CadastroModule { }
