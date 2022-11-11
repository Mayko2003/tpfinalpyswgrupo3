import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private urlBase = `${environment.backendUrl}api/emails`;
  constructor(private http: HttpClient) { }

  send(email:string, text:string):Observable<any>{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      email: email,
      text: text
    }
    return this.http.post(this.urlBase + '/send', body, options);
  }


}
