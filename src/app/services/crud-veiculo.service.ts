import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Veiculo } from '../models/Veiculo.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CrudVeiculoService extends CrudService<Veiculo> {

  constructor(protected http: HttpClient) { 
    super(http, `${environment.API}veiculo`);
  }

  getCliente(id:Number) {
    return this.http.get<Veiculo[]>(`${environment.API}veiculo/${id}`, { headers: this.composeHeaders()});
  }
}
