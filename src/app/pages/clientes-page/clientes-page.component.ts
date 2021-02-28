import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router) 
    { 
      this.form = this.fb.group({
        Nome : ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(150),
          Validators.required
        ])],
        Telefone: ['', Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(15),
          Validators.required
        ])],
        Email: ['', Validators.compose([
          Validators.minLength(7),
          Validators.maxLength(150),
          Validators.required
        ]) ],
        Telefone1: ['', Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(15)
        ])],
        Cep: ['', Validators.compose([
          Validators.minLength(9),
          Validators.maxLength(9),
        ])],
        Endereco: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(255),
        ])],
        Numero: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
        ])],
        Bairro: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(150)
        ])],
        Cidade: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(150)
        ])],
        Estado: ['', Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(2)
        ])],
        Observacao: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255)
        ])]
      });
    }

  ngOnInit() {
  }

}
