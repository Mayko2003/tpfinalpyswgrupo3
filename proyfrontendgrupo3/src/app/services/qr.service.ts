import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private _http:HttpClient) { }

  //QR code generator with text,url,tel,sms and email datatypes .
  //formatos : url,text,telno,mailto,smsto
  
  generarQr(text:string,type:string):Observable<any>{
    const options = {
      method: 'GET',
      params: {
        'value': text,
        'type': type
      },
      headers:new HttpHeaders( {
        'X-RapidAPI-Key': '9c94430549mshea84540462550e7p122b90jsn0792d53e8018',
        'X-RapidAPI-Host': 'codzz-qr-cods.p.rapidapi.com'
      })
    };
    return this._http.get('https://codzz-qr-cods.p.rapidapi.com/getQrcode',options)
  }
}
