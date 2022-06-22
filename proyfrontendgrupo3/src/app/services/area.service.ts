import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  urlBase: string = 'http://localhost:3000/api/areas'
  constructor(private _http: HttpClient) { }

  //servicio para agregar una area
  public addArea(area :Area): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(area)
    return this._http.post(this.urlBase, body, httpOptions)
  }

  //servicio para eliminar una persona
  public deleteArea(area :Area): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase+"/eliminar/"+area._id, httpOptions)
  }

  //servicio para actualizar una persona
  public updateArea(area :Area): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(area)

    return this._http.put(this.urlBase+"/actualizar/"+area._id, body, httpOptions)
  }

  //servicio para enviar todas las areas
  public getAreas(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase, httpOptions)
  }

}
