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
    this.mostrarMisAnuncios();
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

  

  /*

  Estadísticas: se podrá visualizar las cantidades de anuncios por mes, año o un periodo determinado por Area, 
  y por Rol. Tipo de reunión. Realizar grafico en barra y torta. La estadística solo puede ser visualizada 
  por personas que son autoridad en la institución.


  1.Ver anuncios para su rol: podrá ver el detalle de los anuncios que fueron redactados para un determinado rol 
  y que están vigentes.
  2. Búsqueda: podrá realizar búsquedas de anuncios históricos destinado a alguno de los roles que tiene.
  
  */

}
