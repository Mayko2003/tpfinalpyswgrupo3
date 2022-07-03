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
      })
    }
    return this._http.get(this.urlBase+"/area/"+area_id+"/"+estado, httpOptions)
  }

  //servicio para traer los anuncion segun los roles dentro de una o mas areas
  public getAnunciosByRoles(roles: Array<string>,fecha: Date,area:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    const body ={
      "roles": roles,
      "fecha": fecha.toISOString(),
      "area": area
    }
    return this._http.post(this.urlBase+"/roles", body, httpOptions)
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
  
  public getAnunciosFiltro(roles:Array<string>,titulo:string,fecha1:string,fecha2:string,destinatarios:string,medio:string,redactor:string,estado:string,tipoContenido:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: {
        'roles': roles,
        'titulo': titulo,
        'fechaSalidaVigencia':fecha1,
        'fechaEntradaVigencia': fecha2,
        'destinatarios':destinatarios,
        'medioTransmision':medio,
        'redactor':redactor,
        'estado':estado,
        'tipoContenido': tipoContenido
      }
    }
    return this._http.get(this.urlBase+"/busqueda", httpOptions);
  }

  public getAnunciosFechaRango(area:string,fechaInicio:Date,fechaFin:Date):Observable<any>{
    const httpOptions = {
      method: 'POST',
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    const body = {
      "area": area,
      "fechaI": fechaInicio.toString(),
      "fechaF": fechaFin.toString()
    }
    return this._http.post(this.urlBase+"/fecha", body,httpOptions);
  }
}
