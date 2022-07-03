import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private personaService:PersonaService, private areaService:AreaService,private router: Router) { }

  //variables para cargar los anuncios
  anuncios: Array<Anuncio> = [];
  anuncios2: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();
  areaId!:string;
  //variables para realizar el filtro segun el encargado y segun un estado de su eleccion "confeccionado, autorizado, cancelado"
  estado: string = "confeccionado";
  estado2: string = ''; 
  area!: Area;
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

    //validacion de peticion
    this.cargarMisRoles();
    if(this.roles[0].nombre != "encargado"){
        this.router.navigate(['/Login'])
    }
    
    //por defecto mostrara en la pagina del encargado los anuncios con el estado confeccionado (listos para publicarse)
    this.cargarAnuncios();
    this.cargarDestinatarios();
    this.cargarPersonas();
    this.cargarMiArea()
  }

  cargarMiArea() {
    this.area = new Area();
    var areaLogin = this.loginService.areaLogged()
    Object.assign(this.area, areaLogin)
    console.log(this.area)
  }

  //metodo para cargar mis roles
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
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
    if (id) {
      this.personaService.getPersonabyID(id).subscribe(res=>{
        this.area = res.area;
        this.areaId = res.area;
        this.anuncioService.getAnunciosByEncargado(this.areaId,this.estado).subscribe(res => {
          Object.assign(this.anuncios, res)
        })
      })
    }
  }

 

  //con este procedimiento se cambia el estado de un anuncio para autorizarlo, cancelarlo o volverlo a su estado original
  actualizarEstadoAnuncio(anuncioModificado: Anuncio,accion:string){
    anuncioModificado.estados.forEach((element:any)=>{
      if(element.area==this.areaId){
        element.estado = accion;
        if(accion == "autorizado") anuncioModificado.fechaEntradaVigencia = new Date();
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
    this.cargarMiArea()
    console.log(this.area._id+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    
    this.anuncios2 = new Array<Anuncio>();

    this.anuncioService.getAnunciosFiltro(this.area._id,this.texto,this.fechaSalida,this.fechaEntrada,this.destinatario,this.medioPublicacion,this.redactor,this.estado2,this.tipoContenido).subscribe(res=>{
      console.log(res+"abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
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
