import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AlertModalService } from 'src/app/components/shared/alert-modal.service';
import { Address } from 'src/app/models/Address.model';
import { Cliente } from '../../../models/Cliente.model';
import { DataService } from 'src/app/services/data.service';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { erro } from 'src/app/models/erro.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidarCamposService } from 'src/app/components/shared/campos/validar-campos.service';
import { CrudClienteService } from 'src/app/services/crud-cliente.service';


@Component({
  selector: 'app-clientes-page',
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.css']
})
export class ClientesPageComponent implements OnInit {

  excluirmodalRef: BsModalRef;

  //@ViewChild('exluirModal', null) exluirModal;

  form: FormGroup;
  cliente: Cliente;
  id: number = 0;
  bloqueado = false;
  searchAddress: Address;




  constructor(
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService,
    private service: DataService,
    private activatedRoute: ActivatedRoute,
    private alertModalService: AlertModalService,
    public validacao: ValidarCamposService,
    public crudservice: CrudClienteService)
    {
      this.criarFormBranco();
    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    //this.toastr.success(`Cliente Id ${this.id}!`, 'Direcionar para tela de consulta');
    //console.log(this.id);

    if (this.id > 0)
    {
      this.crudservice.getId(this.id).subscribe((data:Cliente) =>{
        this.criaForm(data);
      });
    }else
    {
      this.id = 0;
      this.criarFormBranco();
    }
  }

  criaForm(cliente: Cliente){

    this.form.controls['Nome'].setValue(cliente.nome);
    this.form.controls['Telefone'].setValue(cliente.telefone);
    this.form.controls['Telefone1'].setValue(cliente.telefone1);
    this.form.controls['Cep'].setValue(cliente.cep);
    this.form.controls['Endereco'].setValue(cliente.endereco);
    this.form.controls['Numero'].setValue(cliente.numero);
    this.form.controls['Bairro'].setValue(cliente.bairro);
    this.form.controls['Cidade'].setValue(cliente.cidade);
    this.form.controls['Estado'].setValue(cliente.estado);
    this.form.controls['Email'].setValue(cliente.email);
    this.form.controls['Observacao'].setValue(cliente.observacao);



  }

  criarFormBranco(){
    this.form = this.fb.group({
      Nome : ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(150),
        Validators.required
      ])],
      Telefone: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.required
      ])],
      Email: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(150),
        Validators.required
      ]) ],
      Telefone1: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(15)
      ])],
      Cep: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(8),
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

submit() {
  if (this.id > 0) {
    this.cliente = this.form.value;
    this.cliente.id = this.id;
    this.crudservice.update(this.id, this.form.value).subscribe((data) => {
      this.route.navigate(['/clientes']);
      this.toastr.success('Cliente salvo com sucesso!', 'Cliente Atualizado');
    })
  }else{
    this.crudservice.create(this.form.value)
    .subscribe((data: any) => {
      this.route.navigate(['/clientes']);
      this.toastr.success('Cliente salvo com sucesso!', 'Cliente Adicionado');
    },
    (err: HttpErrorResponse) => {
      let lista = new erro();
      lista = err.error;

      let nomes = [];
      let msg = [];

      for (const prop in lista.errors) { nomes.push(prop) }

      Object.keys(lista.errors).forEach(function(prop) {
        let troca = lista.errors[prop].toString();
        msg.push(troca);
      })

      for (let i = 0; i < nomes.length; i++) {
        this.toastr.error(msg[i], `Campo ${nomes[i]}`);
      }
    }
     );
  }
}



exclui(){

  //this.excluirmodalRef = this.modalService.show(this.exluirModal, { class: 'modal-sm'});
  const result$ = this.alertModalService.ShowConfirm('Confirmação', 'Tem certeza que deseja remover esse Cliente?', 'Sim', 'Não' )
  result$.asObservable()
  .pipe(
    take(1),
    switchMap(result => result ? this.crudservice.delete(this.id) : EMPTY)
  )
  .subscribe(
    success => {
      this.route.navigate(['/clientes']);
      this.toastr.success('Cliente excluido com sucesso!', 'Cliente excluido');
    },
    error => this.toastr.error('Erro ao excluir o Cliente. Tente novamente mais tarde!', 'Erro')
  );
}

retornar(){
  this.route.navigate(['/clientes']);
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

  bloquearForm(event: Event) {
     this.bloqueado = !this.bloqueado;

  }
}

