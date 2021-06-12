import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { SecurityService } from "../util/security.service";


export abstract class CrudService<T>{


    constructor(protected http: HttpClient, private API_URL) { }

    public composeHeaders() {
      const token = SecurityService.getToken();
      const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);

      return headers;
    }

//#region CRUD

create(data): Observable<T>{
    return this.http.post<T>(`${this.API_URL}`, data, { headers: this.composeHeaders()}).pipe(take(1));

  }

  get(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}`, { headers: this.composeHeaders()});
  }

  getId(id: Number): Observable<T>{
    return this.http.get<T>(`${this.API_URL}/${id}`, { headers: this.composeHeaders()});
  }

  update(id: Number, data : T ){
    return this.http.put(`${this.API_URL}/${id}`, data,  {headers: this.composeHeaders()});
  }

  delete(id){
    return this.http.delete(`${this.API_URL}/${id}`, { headers: this.composeHeaders()})
  }

  //#endregion
}
