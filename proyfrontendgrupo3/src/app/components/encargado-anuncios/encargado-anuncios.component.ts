import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-encargado-anuncios',
  templateUrl: './encargado-anuncios.component.html',
  styleUrls: ['./encargado-anuncios.component.css']
})
export class EncargadoAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private loginService: LoginService) { }

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  //este procesimiento cargara los anuncios que pertenezcan al area del encargado y tengan el estado "confeccionado"
  cargarAnuncios() {
    var area = this.loginService.areaLogged();
    if (area != null) {
      this.anuncioService.getAnunciosByEncargado(area).subscribe(res => {
        res.forEach((element: any) => {
          this.anuncio = new Anuncio();
          Object.assign(this.anuncio, element);
          this.anuncios.push(this.anuncio);
        })
      })
    }
  }

  //con este procedimiento se cambia el estado de un anuncio para autorizarlo o no
  actualizarEstadoAnuncio(anuncioModificado: Anuncio){
    this.anuncioService.updateAnuncio(anuncioModificado).subscribe()
  }
}
