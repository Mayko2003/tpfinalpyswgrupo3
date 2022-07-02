import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Estado } from 'src/app/models/estado';
import { Persona } from 'src/app/models/persona';
import { Recurso } from 'src/app/models/recurso';
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
  recurso!: Recurso;

  //variable para agregar las areas y los roles
  areas: Array<Area> = [];
  area: Area = new Area();
  roles: Array<Rol> = [];
  rol: Rol = new Rol();

  //para guardar estados de
  estados: Array<Estado> = [];
  estado: Estado = new Estado();

  //variable para guardar destinatario
  p: Persona = new Persona();

  //varibale para asegurar la subida de archivos 
  upload: boolean = false

  //para guardar los medios de transmicion
  medios: Array<string> = ["FaceBook", "Instagram", "Twitter",]; //implementar variables locales!!!!!!!!!!!!!
  medio: string = ""

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private areaService: AreaService) {
    this.anuncio = new Anuncio();
    this.anuncio.recursos = new Array<Recurso>();
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

  agreagarRecurso() {
    this.anuncio.recursos.push(this.recurso);
  }

  guardarAnuncio(estado: string) {

    //agregamos los estados al anuncio 
    this.estados.forEach((element: any) => {
      element.estado = estado
    })
    this.anuncio.estados = this.estados
    this.anuncio.codigoQR = "hola"

    //agragamos el redactor al anuncio 
    var id = this.loginService.idLogged()
    if (id != null) this.p._id = id

    this.anuncio.redactor = this.p

    //agregamos la fecha de entrada en Vigencia --> Cambiar
    this.anuncio.fechaEntradaVigencia = new Date()

    //guardamos el anuncio
    this.anuncioService.addAnuncio(this.anuncio).subscribe(res => { });
    console.log(JSON.stringify(this.anuncio));
    this.anuncio = new Anuncio();
  }

  actualizarAnuncio() {
    this.anuncioService.updateAnuncio(this.anuncio).subscribe();
    this.anuncio = new Anuncio();
  }

  mostrarMisAnuncios(){
    this.anuncios = new Array<Anuncio>()
    var userid = this.loginService.idLogged()
    if (userid != null) {
      this.anuncioService.getAnunciosByUser(userid).subscribe(res => {
        Object.assign(this.anuncios, res);
      })
    }
  }

  //metodos para cargar las listas del formulario 
  cargarAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe(res => {
      Object.assign(this.areas, res)
    })
  }

  cargarRolesArea(areaid: string) {
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(areaid).subscribe(res => {
      Object.assign(this.roles, res)
    })
  }

  //metodo para cargar los roles a un anuncios
  agregarRol(areaid: string) {
    console.log(areaid)
    //realizamos una verificacion de las areas para agregarlas a los estados
    if (this.estados) {
      var band = false
      this.estados.forEach((element: any) => {
        if (element.area._id == areaid) {
          band = true
        }
      })
      //en caso de que ningun estado sea igual se procede a crear un estado y asignarle el area
      if (!band) {
        this.estado.area._id = areaid
        this.estados.push(this.estado)
        this.estado = new Estado()
        this.estado.area = new Area();
      }
    }

    //implementar validacion de rol (no permitir el mismo rol)!!!!!!!!!!!!!!
    this.anuncio.destinatarios.push(this.rol)
    this.rol = new Rol();
    console.log(this.anuncio.destinatarios)
  }

  //metodo para cargar medios

  agregarMedios() {
    this.anuncio.mediosTransmision.push(this.medio)
    console.log(this.anuncio.mediosTransmision)
  }


  //metodo para cargar contenido y recursos en el anuncio

  getFile(e: any, accion: string) {

    var Extensions = ["png", "jpeg", "pdf", "gif"] //agragar videos (en lo posible)!!!!!!!!!


    for (var i = 0; i < e.target.files.length; i++) {
      //controlamos el tamaño
      if (e.target.files[i].size / 1024 / 1024 > 8) {

        alert("El tamaño del archivo supera los 8 MB")
        this.upload = false
        return;
      }

      //controlamos las extenciones
      var nam: string = e.target.files[0].name.split('.').pop()
      if (!Extensions.includes(nam)) {
        alert("La extencion del archivo no es reconocible")
        this.upload = false
        return;
      }

      //convertimos a base 64 pero antes controlamos el cual input es 
      if(accion == "contenido"){
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      let base64 = ""
      reader.onload = () => {
        if (reader.result != null) {
          base64 = reader.result.toString()
          this.anuncio.contenido = base64
        }
      }
      this.upload = true }
      else{
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[i])
        let base64 = ""
        reader.onload = () => {
          if (reader.result != null) {
            base64 = reader.result.toString()
            this.recurso = new Recurso();
            this.recurso.recurso = base64
            this.recurso.tipo = nam
            this.anuncio.recursos.push(this.recurso)
            
          }
        }
      }
    }

    console.log(this.anuncio.recursos)
  }
}
