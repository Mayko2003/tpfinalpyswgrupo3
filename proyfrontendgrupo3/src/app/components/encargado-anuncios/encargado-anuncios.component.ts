import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-encargado-anuncios',
  templateUrl: './encargado-anuncios.component.html',
  styleUrls: ['./encargado-anuncios.component.css']
})
export class EncargadoAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private personaService:PersonaService) { }

  //variables para cargar los anuncios
  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();
  areaId!:string;
  //variables para realizar el filtro segun el encargado y segun un estado de su eleccion "confeccionado, autorizado, cancelado"
  estado: string = "confeccionado" 
  area!: string ;
  ngOnInit(): void {
    //por defecto mostrara en la pagina del encargado los anuncios con el estado confeccionado (listos para publicarse)
    this.cargarAnuncios();
  }

  //este procesimiento cargara los anuncios que pertenezcan al area del encargado y tengan el estado "confeccionado"
  cargarAnuncios() {
    var id = this.loginService.idLogged();
    this.anuncios = new Array<Anuncio>();
    if(id!=null){
      console.log(id);
      this.personaService.getPersonabyID(id).subscribe(res=>{
        console.log(res);
        this.area = res.area;
        this.areaId = res.area;
        console.log(this.area);
        this.anuncioService.getAnunciosByEncargado(this.area,this.estado).subscribe(res => {
          res.forEach((element: any) => {
            this.anuncio = new Anuncio();
            Object.assign(this.anuncio, element);
            this.anuncios.push(this.anuncio);
          })
          console.log(this.anuncios);
        })
      })
    }
  }

  //con este procedimiento se cambia el estado de un anuncio para autorizarlo, cancelarlo o volverlo a su estado original
  actualizarEstadoAnuncio(anuncioModificado: Anuncio,accion:string){
    console.log(this.areaId);
    console.log(anuncioModificado);
    anuncioModificado.estados.forEach((element:any)=>{
      console.log("aaaa");
      console.log(element);
      console.log(element.area+"=="+this.areaId);
      if(element.area==this.areaId){
        element.estado = accion;
      }
    })
    this.anuncioService.updateAnuncio(anuncioModificado).subscribe();
    this.cargarAnuncios();
  }
}
