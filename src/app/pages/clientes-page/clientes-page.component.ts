import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/Address.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {

  form: FormGroup;

  searchAddress: Address;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private service: DataService) 
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
        Endereco: ['', ],
        Numero: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
        ])],
        Bairro: ['', ],
        Cidade: ['', ],
        Estado: ['', ],
        Observacao: ['', Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255)
        ])]
      });
    }

  ngOnInit() {
  }

submit(){
  
  this.toastr.success('Cliente salvo com sucesso!', 'Cliente Adicionado');
}
mostrarErros(erros){
  this.toastr.success(erros, 'Cliente Adicionado');
}

consultaCEP(cep){
  var cep = cep.replace(/\D/g, ''); //retira os caracteres não numericos
  if( cep != "")
  {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        let dados = this.service.buscaCep(cep)
        .subscribe(
              address => {
                if (address.erro === true) {
                  this.searchAddress = undefined;
                  this.toastr.warning('Digite um Cep Valido.', 'Ops...');
                  this.clearForm();
                } else {
                  this.searchAddress = address;
                  this.fillForm(address);
                }
              },
              error => {
                this.toastr.error('Error: ${error.message}.', 'Ops...');
                this.searchAddress = undefined;
              }
          );

     
     } 
     else {

        this.toastr.error('Digite um Cep Valido.', 'Ops...');
        this.searchAddress = undefined;
        this.clearForm();

        //CEP pesquisado não foi encontrado.
        //limpa_formulário_cep();
        alert("CEP não encontrado.");
      }
    }

  }


  fillForm(model){
    this.form.controls['Endereco'].setValue(model.logradouro);
    this.form.controls['Bairro'].setValue(model.bairro);
    this.form.controls['Cidade'].setValue(model.localidade);
    this.form.controls['Estado'].setValue(model.uf);


 
  }

  clearForm(){
    this.form.controls['Endereco'].setValue(' ');
    this.form.controls['Bairro'].setValue(' ');
    this.form.controls['Cidade'].setValue(' ');
    this.form.controls['Estado'].setValue(' ');

  }


}

