import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { MaterialModule } from 'src/app/modulo/material/material.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    InputTextComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forChild()
  ],
  exports: [
    InputTextComponent
  ]
})
export class CamposModule { }
