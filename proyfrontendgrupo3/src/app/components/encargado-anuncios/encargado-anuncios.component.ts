import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-encargado-anuncios',
  templateUrl: './encargado-anuncios.component.html',
  styleUrls: ['./encargado-anuncios.component.css']
})
export class EncargadoAnunciosComponent implements OnInit {

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private personaService:PersonaService, private areaService:AreaService) { }

  //variables para cargar los anuncios
  anuncios: Array<Anuncio> = [];
  anuncios2: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();
  areaId!:string;
  //variables para realizar el filtro segun el encargado y segun un estado de su eleccion "confeccionado, autorizado, cancelado"
  estado: string = "confeccionado";
  estado2: string = ''; 
  area!: string;
  roles: Array<Rol> = [];
  rolesId : Array<string> = [];
  medioPublicacion:string='';
  tipoContenido:string='';
  redactores!:Array<Persona>;
  redactor:string='';
  destinatario:string='';
  texto:string = '';
  destinatarios!:Array<Rol>;
  fechaSalida:string = '';
  fechaEntrada:string = '';
  ngOnInit(): void {
    //por defecto mostrara en la pagina del encargado los anuncios con el estado confeccionado (listos para publicarse)
    this.cargarAnuncios();
    this.cargarDestinatarios();
    this.cargarPersonas();
  }

  //este procesimiento cargara los anuncios que pertenezcan al area del encargado y tengan el estado "confeccionado"
  cargarAnuncios() {
    this.rolesId = new Array<string>();
    var id = this.loginService.idLogged();
    var rolesLogin = this.loginService.rolLogged();
    
    /* if(rolesLogin != null){
      Object.assign(this.roles,rolesLogin);
      this.roles.forEach((element:any) => {
        this.rolesId.push(element._id);
      });
      console.log(this.rolesId);
    } */
    this.anuncios = new Array<Anuncio>();
    if(id!=null){
      this.personaService.getPersonabyID(id).subscribe(res=>{
        this.areaId = res.area;
        this.anuncioService.getAnunciosByEncargado(this.areaId,this.estado).subscribe(res => {
          res.forEach((element: any) => {
            this.anuncio = new Anuncio();
            Object.assign(this.anuncio, element);
            this.anuncios.push(this.anuncio);
          })
          this.rolesId.push(this.areaId);
          console.log(this.anuncios);
          console.log(this.rolesId);
        })
      })
    }
  }

  //con este procedimiento se cambia el estado de un anuncio para autorizarlo, cancelarlo o volverlo a su estado original
  actualizarEstadoAnuncio(anuncioModificado: Anuncio,accion:string){
    anuncioModificado.estados.forEach((element:any)=>{
      if(element.area==this.areaId){
        element.estado = accion;
      }
    })
    this.anuncioService.updateAnuncio(anuncioModificado).subscribe();
    this.cargarAnuncios();
  }

  //Búsquedas avanzadas, se podrá realizar por destinatario, fechas, medio de publicación, texto, 
  //tipo de contenido, estado, redactor o combinaciones de todas las anteriores.
  cargarPersonas(){
    var id = this.loginService.idLogged();
    this.redactores = new Array<Persona>();
    if(id!=null)
    this.personaService.getPersonabyID(id).subscribe(res=>{
      this.personaService.getPersonasbyArea(res.area).subscribe(res=>{
        res.forEach((element:any) => {
          this.redactores.push(element);
        });
      })
    })
  }
  cargarDestinatarios(){
    var id = this.loginService.idLogged();
    this.destinatarios = new Array<Rol>();
    if(id!=null)
    this.personaService.getPersonabyID(id).subscribe(res=>{
      this.areaService.getRolesArea(res.area).subscribe(res=>{
        res.forEach((element:any) => {
          this.destinatarios.push(element);
        });
      })
    })
  }
  actualizarFiltro(){
    console.log(this.estado2);
    console.log(this.tipoContenido);
    console.log(this.medioPublicacion);
    console.log(this.redactor);
    console.log(this.destinatario);
    console.log(this.fechaSalida);
    console.log(this.fechaEntrada);
    console.log(this.rolesId);
    this.anuncios2 = new Array<Anuncio>();
    this.anuncioService.getAnunciosFiltro(this.rolesId,this.texto,this.fechaSalida,this.fechaEntrada,this.destinatario,this.medioPublicacion,this.redactor,this.estado2,this.tipoContenido).subscribe(res=>{
      console.log(res);
      Object.assign(this.anuncios2,res);
    })
  }
  limpiarFiltro(){
    this.estado2 = "";
    this.tipoContenido = "";
    this.medioPublicacion = "";
    this.redactor = "";
    this.texto = "";
    this.fechaSalida = "";
    this.fechaEntrada = "";
    this.actualizarFiltro();
  }
}
