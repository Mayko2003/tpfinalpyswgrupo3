import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlBase: string = 'http://localhost:3000/api';
  constructor(private _http: HttpClient) {}

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
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('area');
  }

  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem('username');
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }
  public userLogged() {
    var usuario = sessionStorage.getItem('username');
    return usuario;
  }
  public rolLogged() {
    var roles = sessionStorage.getItem('roles');
    if (roles)
      roles = JSON.parse(roles)
    return roles;
  }
  public areaLogged() {
    var area = sessionStorage.getItem('area');
    return area; 
  }
  public idLogged() {
    var id = sessionStorage.getItem('userid');
    return id;
  }
}
