import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  urlBase: string = `${environment.backendUrl}/api/personas`
  constructor(private _http: HttpClient) { }

  //servicio para agregar una persona
  public addPersona(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(persona)
    return this._http.post(this.urlBase + "/crear", body, httpOptions)
  }

  //servicio para eliminar una persona
  public deletePasaje(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.urlBase + "/eliminar/" + persona._id, httpOptions)
  }

  //servicio para actualizar una persona
  public updatePasaje(persona: Persona): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = JSON.stringify(persona)

    return this._http.put(this.urlBase + "/actualizar/" + persona._id, body, httpOptions)
  }

  //servicio para enviar todas las personas
  public getPersonas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase, httpOptions)
  }

  //servicio enviar una persona segun su id
  public getPersonabyID(_id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase + "/" + _id, httpOptions)
  }

  //servicio para obtener personas segun su area
  public getPersonasbyArea(_idArea: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.get(this.urlBase + "/area/" + _idArea, httpOptions)
  }
}
