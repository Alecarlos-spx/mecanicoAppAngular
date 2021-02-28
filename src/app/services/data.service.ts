import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SecurityService } from '../util/security.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = 'https://localhost:44342/api';

  constructor(private http: HttpClient) { }



//#region token
  public composeHeaders() {
    const token = SecurityService.getToken();
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);

    return headers;
  }

  login(data) {
    return this.http.post(`${this.url}/user/login`, data);
  }

  refreshToken(){
    //verificar o processo, se tem que passar o id do user para gerar um novo token
    //return this.http.post(`${this.url}/user/refresh`, null, {headers: this.composeHeaders()})
  }

//#endregion

//#region Clientes

createCliente(data){
  return this.http.post(`${this.url}/cliente`, data, { headers: this.composeHeaders()});
}

getCliente(){
  return this.http.get(`${this.url}/cliente`, { headers: this.composeHeaders()});
}

getClienteId(id){
  return this.http.get(`${this.url}/cliente/${id}`, { headers: this.composeHeaders()});
}

updateCliente(id){
  return this.http.put(`${this.url}/cliente/${id}`, { headers: this.composeHeaders()});
}

deleteCliente(id){
  return this.http.delete(`${this.url}/cliente/${id}`, { headers: this.composeHeaders()})
}

//#endregion






}
