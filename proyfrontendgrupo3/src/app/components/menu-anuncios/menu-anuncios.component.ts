import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AreaRol } from 'src/app/models/area-rol';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-menu-anuncios',
  templateUrl: './menu-anuncios.component.html',
  styleUrls: ['./menu-anuncios.component.css']
})
export class MenuAnunciosComponent implements OnInit {

  //variables para cargar anuncios dirigidos a los roles de un usuario 
  anuncios: Array<Anuncio> = [];
  fecha!: Date;
  roles: Array<Rol> = [];
  rolesId : Array<string> = [];
  medioPublicacion:string='';
  estado:string='';
  tipoContenido:string='';
  redactores!:Array<Persona>;
  redactor:string='';
  destinatario:string='';
  texto:string = '';
  destinatarios!:Array<Rol>;
  fechaSalida:string = '';
  fechaEntrada:string = '';
  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private personaService: PersonaService, private areaService:AreaService) { }

  ngOnInit(): void {
    this.cargarAnuncios();
    this.cargarPersonas();
    this.cargarDestinatarios();
  }
  //carga los anuncios vigentes, con el estado autorizado, teniendo en cuenta el rol o roles de la persona logueada
  cargarAnuncios(){
    //cargo el id y roles logeados
    var id = this.loginService.idLogged();
    var rolesLogin = this.loginService.rolLogged();
    
    if(rolesLogin != null){
      Object.assign(this.roles,rolesLogin);
      this.roles.forEach((element:any) => {
        this.rolesId.push(element._id);
      });
      console.log(this.rolesId);
    }
    if(id != null){ 
      this.personaService.getPersonabyID(id).subscribe(res=>{
        //cargo la fecha de hoy para cargar los anuncios vigentes
        this.fecha = new Date()
        // thisfecha <= fechaSalida
        this.anuncioService.getAnunciosByRoles(this.rolesId,this.fecha,res.area).subscribe(res =>{
          Object.assign(this.anuncios,res)
          console.log(this.anuncios);
        })
      })
    }
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
    /* console.log(this.estado);
    console.log(this.tipoContenido);
    console.log(this.medioPublicacion);
    console.log(this.redactor);
    console.log(this.destinatario);
    console.log(this.fechaSalida);
    console.log(this.fechaEntrada); */
    this.anuncios = new Array<Anuncio>();
    this.anuncioService.getAnunciosFiltro(this.rolesId,this.texto,this.fechaSalida,this.fechaEntrada,this.destinatario,this.medioPublicacion,this.redactor,this.estado,this.tipoContenido).subscribe(res=>{
      Object.assign(this.anuncios,res);
    })
  }
  limpiarFiltro(){
    this.estado = "";
    this.tipoContenido = "";
    this.medioPublicacion = "";
    this.redactor = "";
    this.texto = "";
    this.fechaSalida = "";
    this.fechaEntrada = "";
    this.actualizarFiltro();
  }
}
