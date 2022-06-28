import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-encargado-anuncios',
  templateUrl: './encargado-anuncios.component.html',
  styleUrls: ['./encargado-anuncios.component.css']
})
export class EncargadoAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private loginService: LoginService) { }

  //variables para cargar los anuncios
  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();

  //variables para realizar el filtro segun el encargado y segun un estado de su eleccion "confeccionado, autorizado, denegado, cancelado"
  estado: string = "confeccionado" 
  areaLogeada: Area = new Area();
  ngOnInit(): void {
    //por defecto mostrara en la pagina del encargado los anuncios con el estado confeccionado (listos para publicarse)
    this.cargarAnuncios();
  }

  //este procesimiento cargara los anuncios que pertenezcan al area del encargado y tengan el estado "confeccionado"
  cargarAnuncios() {
    var area = this.loginService.areaLogged();
    if (area != null) {
      Object.assign(this.areaLogeada,area)
      this.anuncioService.getAnunciosByEncargado(this.areaLogeada._id,this.estado).subscribe(res => {
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
