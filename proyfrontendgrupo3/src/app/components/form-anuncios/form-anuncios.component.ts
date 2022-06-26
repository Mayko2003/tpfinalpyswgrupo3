import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-form-anuncios',
  templateUrl: './form-anuncios.component.html',
  styleUrls: ['./form-anuncios.component.css']
})
export class FormAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService) { }

  anuncio: Anuncio = new Anuncio();

  ngOnInit(): void {
    //implementar validacion LOGIN
  }

  guardarAnuncio(){
    this.anuncioService.addAnuncio(this.anuncio).subscribe();
  }

  actualizarAnuncio(){
    this.anuncioService.updateAnuncio(this.anuncio).subscribe();
  }

  //borrar anuncio VERIFICAR IMPLEMENTACION
  /*
  borrarAnuncio(){
    this.anuncioService.deleteAnuncio(this.anuncio).subscribe();
  }
  */
}
