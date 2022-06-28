import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-form-anuncios',
  templateUrl: './form-anuncios.component.html',
  styleUrls: ['./form-anuncios.component.css']
})
export class FormAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private loginService: LoginService) { }

  //variable usada para guardar o editar un anuncio
  anuncio: Anuncio = new Anuncio();

  //variable usada para cargar los anuncios del Usuario
  anuncios: Array<Anuncio> = [];

  ngOnInit(): void {
    //implementar validacion LOGIN
  }

  guardarAnuncio(){
    this.anuncioService.addAnuncio(this.anuncio).subscribe();
    this.anuncio = new Anuncio();
  }

  actualizarAnuncio(){
    this.anuncioService.updateAnuncio(this.anuncio).subscribe();
    this.anuncio = new Anuncio();
  }

  mostrarMisAnuncios(){
    this.anuncios = new Array<Anuncio>()
    var userid = this.loginService.idLogged()
    if(userid != null){
      this.anuncioService.getAnunciosByUser(userid).subscribe(res => {
        Object.assign(this.anuncios,res);
      })
    }
  }

  


}
