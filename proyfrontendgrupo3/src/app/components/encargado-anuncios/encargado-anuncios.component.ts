import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';
import { QrService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-encargado-anuncios',
  templateUrl: './encargado-anuncios.component.html',
  styleUrls: ['./encargado-anuncios.component.css']
})
export class EncargadoAnunciosComponent implements OnInit {

  //variables para cargar los anuncios
  anuncios: Array<Anuncio> = [];
  anuncioFiltro: Array<Anuncio> = [];
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
  fechaEntrada: string = '';

  //valida los recursos que se mostraran en la visata
  contenidos!: Array<SafeResourceUrl>;
  contenidosFiltro!: Array<SafeResourceUrl>;

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private personaService:PersonaService, private areaService:AreaService,private router: Router, private sanitizer:DomSanitizer, private qrService: QrService) { }
  
  ngOnInit(): void {
    //validacion de peticion
    this.cargarMisRoles();
    if (this.roles[0].nombre != "Encargado" && this.roles[0].nombre != "encargado"){
        this.router.navigate(['/Login'])
    }
    
    //por defecto mostrara en la pagina del encargado los anuncios con el estado confeccionado (listos para publicarse)
    this.cargarAnuncios();
    this.cargarDestinatarios();
    this.cargarPersonas();
    this.cargarMiArea()
    this.limpiarFiltro();
  }

  cargarMiArea() {
    this.area = new Area();
    var areaLogin = this.loginService.areaLogged()
    Object.assign(this.area, areaLogin)
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
    this.anuncios = new Array<Anuncio>();
    if (id) {
      this.personaService.getPersonabyID(id).subscribe(res=>{
        this.area = res.area;
        this.areaId = res.area;
        this.contenidos = new Array<SafeResourceUrl>();
        this.anuncioService.getAnunciosByEncargado(this.areaId, this.estado).subscribe(res => {
          this.anuncios = res;
          (this.anuncios)
          this.anuncios.forEach(anuncio => {
            this.contenidos.push(this.sanitizer.bypassSecurityTrustResourceUrl(anuncio.contenido))
          })
        })
      })
    }
  }

  //con este procedimiento se cambia el estado de un anuncio para autorizarlo, cancelarlo o volverlo a su estado original
  actualizarEstadoAnuncio(anuncioModificado: Anuncio,accion:string){
    anuncioModificado.estados.forEach((element:any)=>{
      if(element.area==this.areaId){
        element.estado = accion;
        if(accion == "autorizado"){
          anuncioModificado.fechaEntradaVigencia = new Date();
        }
        if(accion == "editar" && anuncioModificado.estados.length > 1){
          var clon = new Anuncio();
          Object.assign(clon, anuncioModificado);
          clon._id = undefined as any;
          clon.codigoQR = ""
          clon.estados = new Array<any>();
          clon.estados.push(element);

          

          //remove element from array estados of anuncioModificado
          anuncioModificado.estados.splice(anuncioModificado.estados.indexOf(element), 1);

          //save clon
          this.anuncioService.addAnuncio(clon).subscribe(res=>{
            //update qr code 
            var text = window.location.host + '/recursos/' + res.id;
            clon._id = "" + res.id;
            this.qrService.generarQr(text, 'url').subscribe((res) => {
              clon.codigoQR = res.url
              this.anuncioService.updateAnuncio(clon).subscribe()
            });
          })
        }
      }
    })
    this.anuncioService.updateAnuncio(anuncioModificado).subscribe();
    //this.cargarAnuncios();
  }

  obtenerEstado(anuncio:Anuncio):string{
    for(let i = 0; i < anuncio.estados.length; i++){
      var area = anuncio.estados[i].area as unknown as string;
      if(area == this.areaId){
        return anuncio.estados[i].estado;
      }
    }
    return "";
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
    this.cargarMiArea()
    this.anuncioFiltro = new Array<Anuncio>();
    this.contenidosFiltro = new Array<SafeResourceUrl>();
    this.anuncioService.getAnunciosFiltro(this.area._id,this.texto,this.fechaSalida,this.fechaEntrada,this.destinatario,this.medioPublicacion,this.redactor,this.estado2,this.tipoContenido).subscribe(res=>{
      Object.assign(this.anuncioFiltro, res);
      this.anuncioFiltro.forEach(anuncio => {
        this.contenidosFiltro.push(this.sanitizer.bypassSecurityTrustResourceUrl(anuncio.contenido))
      })
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
