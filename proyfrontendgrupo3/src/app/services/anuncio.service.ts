import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anuncio } from '../models/anuncio';
import { Area } from '../models/area';
import { AreaRol } from '../models/area-rol';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  urlBase: string = 'http://localhost:3000/api/anuncios'
  constructor(private _http: HttpClient) { }

  //servicio para agregar una Anuncio
  public addAnuncio(anuncio: Anuncio): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(anuncio)
    return this._http.post(this.urlBase+"/crear", body, httpOptions)
  }

  //servicio para eliminar un Anuncio
  public deleteAnuncio(anuncio :Anuncio): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase+"/eliminar/"+anuncio._id, httpOptions)
  }

  //servicio para actualizar una persona
  public updateAnuncio(anuncio :Anuncio): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(anuncio)

    return this._http.put(this.urlBase+"/actualizar/"+anuncio._id, body, httpOptions)
  }

  //servicio para enviar todas los Anuncios --> para testing
  public getAnuncios(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase, httpOptions)
  }

  //servicio para traer los anuncios que necesita inspeccionar un Encargado de Area segun un estado que el proporcione
  public getAnunciosByEncargado(area_id: string,estado: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: {
        'area': area_id,
        'estado': estado
      }
    }
    return this._http.get(this.urlBase, httpOptions)
  }

  //servicio para traer los anuncion segun los roles dentro de una o mas areas
  public getAnunciosByRoles(areaRoles: AreaRol,fecha: Date): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    const body = new HttpParams()
    .set('fecha', JSON.stringify(fecha))
    .set('areaRoles', JSON.stringify(areaRoles))

    return this._http.post(this.urlBase, body, httpOptions)
  }

  //servicio para traer los anuncios de un usuario en particular
  public getAnunciosByUser(user_id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
    return this._http.get(this.urlBase+"/persona/"+user_id, httpOptions)
  }

  public getAnunciosByArea(area_id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
    return this._http.get(this.urlBase+"/area/"+area_id, httpOptions)
  }
  
}
