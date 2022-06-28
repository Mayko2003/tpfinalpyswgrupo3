import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  
  urlBase: string = 'http://localhost:3000/api'
  constructor(private _http: HttpClient) { }

  //servicio para agregar una persona
  public addPersona(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(persona)
    return this._http.post(this.urlBase, body, httpOptions)
  }

  //servicio para eliminar una persona
  public deletePasaje(persona: Persona): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase+"/"+persona._id, httpOptions)
  }

  //servicio para actualizar una persona
  public updatePasaje(persona: Persona): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(persona)

    return this._http.put(this.urlBase+"/"+persona._id, body, httpOptions)
  }

  //servicio para enviar todas las personas
  public getPersonas(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase + "/personas", httpOptions)
  }

  //servicio enviar una persona segun su id
  public getPersonabyID(_id:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase+"/"+_id, httpOptions)
  }

  

}
