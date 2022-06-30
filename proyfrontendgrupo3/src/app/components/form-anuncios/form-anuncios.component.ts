import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Estado } from 'src/app/models/estado';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-form-anuncios',
  templateUrl: './form-anuncios.component.html',
  styleUrls: ['./form-anuncios.component.css']
})
export class FormAnunciosComponent implements OnInit {

  //variable usada para guardar o editar un anuncio
  anuncio: Anuncio = new Anuncio();

  //variable usada para cargar los anuncios del Usuario
  anuncios: Array<Anuncio> = [];

  //variable para cargar recursos de la
  recurso!: string;

  //variable para agregar las areas y los roles
  areas: Array<Area> = [];
  area: Area = new Area();
  roles: Array<Rol> = [];
  rol: Rol = new Rol();

  //para guardar estados de
  estados: Array<Estado> = [];
  estado: Estado = new Estado();
  p: Persona = new Persona();

  //para guardar los medios de transmicion
  medios: Array<string> = ["FaceBook","Instagram","Twitter",]; //implementar variables locales!!!!!!!!!!!!!

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private areaService: AreaService) { 
    this.anuncio = new Anuncio();
    this.anuncio.recursos = new Array<string>();
    this.anuncio.destinatarios = new Array<Rol>();
    this.anuncio.mediosTransmision = new Array<string>();
    this.anuncios = new Array<Anuncio>();
    this.areas = new Array<Area>();
    this.roles = new Array<Rol>();
    this.estados = new Array<Estado>();
    this.estado = new Estado();
    this.estado.area = new Area();

  }


  ngOnInit(): void {
    this.cargarAreas()
  }

  agreagarRecurso(){
    this.anuncio.recursos.push(this.recurso);
  }

  guardarAnuncio(estado: string){
    
    this.estados.forEach((element: any) =>{
      element.estado = estado
    })
    this.anuncio.estados = this.estados
    this.anuncio.codigoQR =  "hola"
    this.p._id = "62bbc99b1316ab1e3b50e85c"
    this.anuncio.redactor = this.p
    this.anuncio.fechaEntradaVigencia = new Date()
    this.anuncioService.addAnuncio(this.anuncio).subscribe(res => {});
    console.log(JSON.stringify(this.anuncio));    
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

  //metodos para cargar las listas del formulario 
  cargarAreas(){
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe(res => {
      Object.assign(this.areas,res)
    })
  }
  
  cargarRolesArea(areaid: string){
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(areaid).subscribe(res => {
      Object.assign(this.roles,res)
    })
  }

  //metodo para cargar los roles a un anuncios
  agregarRol(areaid: string){
    
  //realizamos una verificacion de las areas para agregarlas a los estados
    if(this.estados){
      var band = false
      this.estados.forEach( (element: any) => {
        if(element.area._id == areaid){
          band = true
        }
      })
      //en caso de que ningun estado sea igual se procede a crear un estado y asignarle el area
      if(!band){
        this.estado.area._id = areaid
        this.estados.push(this.estado)
        this.estado = new Estado()
        this.estado.area = new Area();
      }
    }

    this.anuncio.destinatarios.push(this.rol)
    this.rol = new Rol();
    console.log(this.anuncio.destinatarios)
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
