import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  urlBase: string = 'http://localhost:3000/api/estados'
  constructor(private _http: HttpClient) { }

  //servicio para agregar un Estado
  public addEstado(estado :Estado): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(estado)
    return this._http.post(this.urlBase + '/crear', body, httpOptions)
  }

  //servicio para eliminar un Estado
  public deleteEstado(estado :Estado): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase+"/eliminar/"+estado._id, httpOptions)
  }

  //servicio para actualizar un Estado
  public updateEstado(estado :Estado): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(estado)

    return this._http.put(this.urlBase+"/actualizar/"+estado._id, body, httpOptions)
  }

  //servicio para enviar todas los Estados --> testing
  public getEstados(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase, httpOptions)
  }
}
