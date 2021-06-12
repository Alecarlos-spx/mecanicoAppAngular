import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/Address.model';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  public readonly url = environment.API;


  constructor(private http: HttpClient) { }



//#region token

  login(data) {
    return this.http.post(`${this.url}user/login`, data);
  }

  refreshToken(){
    //verificar o processo, se tem que passar o id do user para gerar um novo token
    //return this.http.post(`${this.url}/user/refresh`, null, {headers: this.composeHeaders()})
  }

//#endregion

buscaCep(cep){
  let urlSiteCep = `https://viacep.com.br/ws/${cep}/json`;

   return this.http.get<Address>(`${urlSiteCep}`);

}



//#region Clientes

// createCliente(data): Observable<Cliente>{
//   return this.http.post<Cliente>(`${this.url}/cliente`, data, { headers: this.headers.composeHeaders()});

// }

// getCliente() {

//   return this.http.get<Cliente[]>(`${this.url}/cliente`, { headers: this.headers.composeHeaders()});


// }

// getClienteId(id: Number): Observable<Cliente>{
//   return this.http.get<Cliente>(`${this.url}/cliente/${id}`, { headers: this.headers.composeHeaders()});
// }

// updateCliente(id: Number, data : Cliente ){
//   return this.http.put(`${this.url}/cliente/${id}`, data,  {headers: this.headers.composeHeaders()});
// }

// deleteCliente(id){
//   return this.http.delete(`${this.url}/cliente/${id}`, { headers: this.headers.composeHeaders()})
// }

//#endregion


private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}


}
