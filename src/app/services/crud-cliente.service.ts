import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/Cliente.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CrudClienteService extends CrudService<Cliente> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}cliente`);
  }
}
