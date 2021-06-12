import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FabricanteVeiculos } from '../models/FabricanteVeiculos.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CrudFabricanteService extends CrudService<FabricanteVeiculos> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}fabricanteveiculos`);
  }
}
