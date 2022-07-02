import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlBase: string = 'http://localhost:3000/api';
  constructor(private _http: HttpClient, private personaService: PersonaService) { }

  //servicio para autenticar una persona en el login
  public login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      'username': username,
      'password': password
    }
    return this._http.post(this.urlBase + '/personas/login', JSON.stringify(body), httpOptions);
  }

  //servicio de deslogeo
  public logout() {
    //borro el token
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('area');
    sessionStorage.removeItem('userid');
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem('token');
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  public getToken() {
    if (this.userLoggedIn()) return sessionStorage.getItem('token');
    return "";
  }

  public userLogged() {
    var userid = this.idLogged()
    if (userid) return this.personaService.getPersonabyID(userid);
    return null;
  }


  public rolLogged() {
    var roles = sessionStorage.getItem('roles');
    if (roles) {
      roles = JSON.parse(roles)
      return roles;
    }
    return null;
  }
  public areaLogged() {
    var area = sessionStorage.getItem('area');
    if (area) return area;
    return null;
  }
  public idLogged() {
    var id = sessionStorage.getItem('userid');
    if (id) return id;
    return null;
  }
}
