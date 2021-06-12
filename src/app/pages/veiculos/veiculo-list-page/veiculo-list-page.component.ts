import { Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo.model';
import { CrudVeiculoService } from 'src/app/services/crud-veiculo.service';

@Component({
  selector: 'app-veiculo-list-page',
  templateUrl: './veiculo-list-page.component.html',
  styleUrls: ['./veiculo-list-page.component.css']
})
export class VeiculoListPageComponent implements OnInit {

  @Input() idCliente: number;
  @Output() bloquearFormCliente = new EventEmitter();
  _users: Veiculo[];
  mostrarLista: boolean = true;


  id: number = 0;

  parametros: Object = {};

  ngOnInit() {
    //this.bloquearFormCliente.emit({"bloqueado": false});

    this.crudservice.get().subscribe((data: Veiculo[]) => {
      this._users = data.filter((filtrar) => {
        return filtrar.idCliente == this.idCliente;
      } );
      this.dataSource = new MatTableDataSource(this._users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.parametros = {
        id: this.id,
        idCliente: this.idCliente,
        mostrarLista: this.mostrarLista
      };
    }, (error: any) => console.log(error)
    );
  }

  displayedColumns: string[] = ['id', 'modelo', 'anoFabricacao', 'placa'];
  dataSource: MatTableDataSource<Veiculo>;


 @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: true}) sort: MatSort;

 constructor(private toastr: ToastrService,
   private route: Router,
   private crudservice: CrudVeiculoService ) {
   // Create 100 users
   //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));



}

mostraItem(id){
 //this.toastr.success(`Cliente Id ${id}!`, 'Direcionar para tela de consulta');
//  if (id) {
//    this.route.navigate([`veiculos/${id}`]);
//  } else {
//    this.route.navigate([`veiculos/cadastro/`]);
//  }
this.id = id;
this.parametros = {
  id: this.id,
  idCliente: this.idCliente,
  mostrarLista: this.mostrarLista
};

 this.mostrarLista=false;
 this.bloquearFormCliente.emit({"bloqueado": true});
}

adicionarNovo() {
 //this.route.navigate([`veiculos/cadastro/${this.idCliente}`]);
 this.id = 0;
 this.parametros = {
  id: this.id,
  idCliente: this.idCliente,
  mostrarLista: this.mostrarLista
};
 this.mostrarLista = false;
 this.bloquearFormCliente.emit({"bloqueado": true});
}

 // ngAfterViewInit() {
 //   this.dataSource.paginator = this.paginator;
 //       this.dataSource.sort = this.sort;

 // }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;

   this.dataSource.filter = filterValue.trim().toLowerCase();


   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
  }

  respostaMostrar(resposta) {
    this.mostrarLista = resposta;
    this.bloquearFormCliente.emit({"bloqueado": false});
    this.ngOnInit();

  }




}


