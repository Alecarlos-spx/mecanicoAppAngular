import { Combustivel } from './../../../models/Combustivel.enum';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { CrudFabricanteService } from './../../../services/crud-fabricante.service';
import { FabricanteVeiculos } from '../../../models/FabricanteVeiculos.model';
import { Veiculo } from 'src/app/models/Veiculo.model';
import { CrudVeiculoService } from 'src/app/services/crud-veiculo.service';
import { erro } from 'src/app/models/erro.model';
import { AlertModalService } from 'src/app/components/shared/alert-modal.service';

@Component({
  selector: 'app-veiculo-page',
  templateUrl: './veiculo-page.component.html',
  styleUrls: ['./veiculo-page.component.css']
})
export class VeiculoPageComponent implements OnInit {

  //[id, idCliente]="id, idCliente"
  @Input() parametros;

  @Output() respostaLista = new EventEmitter();

  // @Input() id: number = 0;
  // @Input() idCliente: number = 0;




  excluimodalRef: BsModalRef;

  form: FormGroup;
  veiculo: Veiculo;
  id: number = 0;
  idCliente: number = 0;
  listaFabricantes: FabricanteVeiculos[];
  listaCombustivel = Combustivel;



  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private alertModalService: AlertModalService,
    public crudService: CrudVeiculoService,
    public crudFabricanteService: CrudFabricanteService) {
      this.criaFormBranco();
    }

  ngOnInit() {
    //this.id = this.activatedRoute.snapshot.params['id'];
    //this.idCliente = this.activatedRoute.snapshot.params['idCliente'];

    this.id = this.parametros.id;
    this.idCliente = this.parametros.idCliente;

    this.crudFabricanteService.get().subscribe((data: FabricanteVeiculos[]) => {
      this.listaFabricantes = data;
    });


    if (this.id > 0) {
      this.crudService.getId(this.id).subscribe((data: Veiculo) => {
        this.criaForm(data);
      });
    } else {
      this.id = 0;
      this.criaFormBranco();
    }
  }

  criaForm(veiculo: Veiculo) {
    this.form.controls['IDCliente'].setValue(veiculo.idCliente);
    this.form.controls['Modelo'].setValue(veiculo.modelo);
    this.form.controls['AnoFabricacao'].setValue(veiculo.anoFabricacao);
    this.form.controls['AnoModelo'].setValue(veiculo.anoModelo);
    this.form.controls['IdFabricanteVeiculo'].setValue(veiculo.idFabricanteVeiculo);
    this.form.controls['Cor'].setValue(veiculo.cor);
    this.form.controls['Placa'].setValue(veiculo.placa);
    this.form.controls['Combustivel'].setValue(veiculo.combustivel);
  }

  criaFormBranco() {
    this.form = this.fb.group({
      IDCliente : [this.idCliente],
      Modelo : ['', Validators.compose([
        Validators.maxLength(50)
      ])],
      AnoFabricacao : ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(4),
      ])],
      AnoModelo : ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(4),
      ])],
      IdFabricanteVeiculo : [''],
      Cor : ['', Validators.compose([
        Validators.maxLength(45),
      ])],
      Placa : ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.required
      ])],
      Combustivel : ['']
    });

  }

  submit() {
    if (this.id > 0) {
      this.veiculo = this.form.value;
      this.veiculo.id = this.id;

      this.crudService.update(this.id, this.form.value).subscribe((data) => {
        //this.route.navigate([`/clientes/${this.idCliente}`]);
        this.respostaListaVeiculos();
        this.toastr.success('Veículo salvo com sucesso!', 'Veículo Atualizado');
      })
    } else {
      this.crudService.create(this.form.value)
      .subscribe((data:any)=> {
        //this.route.navigate([`/clientes/${this.idCliente}`]);
        this.respostaListaVeiculos();
        this.toastr.success('Veículo salvo com sucesso!', 'Veículo Adicionado');
      },
      // tslint:disable-next-line: no-unused-expression
      (err: HttpErrorResponse) => {
        let lista = new erro();
        lista = err.error;

        let nomes = [];
        var msg =[];

        for(const prop in lista.errors) {
          nomes.push(prop);
        }

        Object.keys(lista.errors).forEach(function(prop) {
          let troca = lista.errors[prop].toString();
          msg.push(troca);
        });

        for (let i = 0; i < nomes.length; i++) {
          this.toastr.error(msg[i], `Campo ${nomes[i]}`);
        }
      });
    }
  }

  exclui() {
    const result$ = this.alertModalService.ShowConfirm('Confirmação', 'Tem certeza que deseja remover esse Veículo?', 'Sim', 'Não' )
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.crudService.delete(this.id) : EMPTY)
    )
    .subscribe(
      success => {
        //this.route.navigate([`/clientes/${this.idCliente}`]);
        this.respostaListaVeiculos();
        this.toastr.success('Veículo excluido com sucesso!', 'Veículo excluido');
      },
      error => this.toastr.error('Erro ao excluir o Veículo. Tente novamente mais tarde!', 'Erro')
    );
  }

  retornar() {
    //this.route.navigate([`/clientes/${this.idCliente}`]);
    this.respostaListaVeiculos();
  }


  mostrarErros(erros) {
    this.toastr.success(erros, 'Veículo Adicionado');
  }

  fillForm(model) {
    this.form.controls['IDCliente'].setValue(model.idCliente);
    this.form.controls['Modelo'].setValue(model.modelo);
    this.form.controls['AnoFabricacao'].setValue(model.anoFabricacao);
    this.form.controls['AnoModelo'].setValue(model.anoModelo);
    this.form.controls['IdFabricanteVeiculo'].setValue(model.idFabricanteVeiculo);
    this.form.controls['Cor'].setValue(model.cor);
    this.form.controls['Placa'].setValue(model.placa);
    this.form.controls['Combustivel'].setValue(model.combustivel);
  }

  clearForm() {
    this.form.controls['Endereco'].setValue(' ');
    this.form.controls['Bairro'].setValue(' ');
    this.form.controls['Cidade'].setValue(' ');
    this.form.controls['Estado'].setValue(' ');

    this.form.controls['IDCliente'].setValue(' ');
    this.form.controls['Modelo'].setValue(' ');
    this.form.controls['AnoFabricacao'].setValue(' ');
    this.form.controls['AnoModelo'].setValue(' ');
    this.form.controls['IdFabricanteVeiculo'].setValue(' ');
    this.form.controls['Cor'].setValue(' ');
    this.form.controls['Placa'].setValue(' ');
    this.form.controls['Combustivel'].setValue(' ');

  }


  respostaListaVeiculos() {
    this.respostaLista.emit({"mostrarLista": true});
  }
}
