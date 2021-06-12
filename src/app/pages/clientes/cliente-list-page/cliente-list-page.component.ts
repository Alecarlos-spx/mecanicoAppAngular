import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/Cliente.model';

import { CrudClienteService } from 'src/app/services/crud-cliente.service';


// /** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];



@Component({
  selector: 'app-cliente-list-page',
  templateUrl: './cliente-list-page.component.html',
  styleUrls: ['./cliente-list-page.component.css']
})
export class ClienteListPageComponent  {

   _users: Cliente[];

   displayedColumns: string[] = ['_id', 'Nome', 'Telefone', 'Telefone1'];
   dataSource: MatTableDataSource<Cliente>;




  @ViewChild(MatPaginator,  {static: true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private toastr: ToastrService,
    private route: Router,
    private crudservice: CrudClienteService) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));


    this.crudservice.get().subscribe((data: Cliente[]) => {
        this._users = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (error: any) => console.log(error)
      );
}

mostraItem(id?){
  //this.toastr.success(`Cliente Id ${id}!`, 'Direcionar para tela de consulta');
  if(id){
    this.route.navigate([`clientes/${id}`]);
  }else{
    this.route.navigate([`clientes/cadastro`]);
  }

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
}

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
