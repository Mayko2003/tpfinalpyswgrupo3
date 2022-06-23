import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  urlBase: string = 'http://localhost:3000/api/roles'
  constructor(private _http: HttpClient) { }
  
  //servicio para agregar una rol
  public addRol(rol :Rol): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(rol)
    return this._http.post(this.urlBase+'/crear', body, httpOptions)
  }
  //servicio para eliminar una rol
  public deleteRol(rol: Rol): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase+"/eliminar/"+rol._id, httpOptions)
  }

  //servicio para actualizar una rol
  public updateRol(rol:Rol): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(rol)

    return this._http.put(this.urlBase+"/actualizar/"+rol._id, body, httpOptions)
  }

  //servicio para recuperar todas las roles
  public getRoles(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase, httpOptions)
  }
}
