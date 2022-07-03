import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Estado } from 'src/app/models/estado';
import { Persona } from 'src/app/models/persona';
import { Recurso } from 'src/app/models/recurso';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';
import { QrService } from 'src/app/services/qr.service';

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

  //varibale para asegurar la subida de archivos 
  upload: boolean = false

  //para guardar los medios de transmicion
  medios: Array<string> = ["FaceBook", "Instagram", "Twitter",]; //implementar variables locales!!!!!!!!!!!!!
  medio: string = ""

  modoCrear!: boolean;
  modoEditar!: boolean;



  constructor(private anuncioService: AnuncioService, private loginService: LoginService,
    private areaService: AreaService, private qrService: QrService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.anuncio = new Anuncio();
    this.anuncio.recursos = new Array<Recurso>();
    this.anuncio.destinatarios = new Array<Rol>();
    this.anuncio.mediosTransmision = new Array<string>();
    this.anuncio.redactor = new Persona();
    this.anuncios = new Array<Anuncio>();
    this.areas = new Array<Area>();
    this.roles = new Array<Rol>();
    this.estados = new Array<Estado>();
    this.estado = new Estado();
    this.estado.area = new Area();
  

    this.modoEditar = false;
    this.modoCrear = false;
  }


  ngOnInit(): void {
    this.cargarAreas()
    this.mostrarMisAnuncios()
  }

  //-----------------------METODOS PARA GUARDAR/EDITAR MIS ANUNCIOS---------------------


  //metodo para cargar contenido y los recursos en el anuncio
  getFile(e: any, accion: string) {
    //agregar tipo de archivos
    var Extensions = ["png", "jpg", "jpeg", "pdf", "gif", "html", "mp4", "avi", "webm"]

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
      if (accion == "contenido") {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        let base64 = ""
        reader.onload = () => {
          if (reader.result != null) {
            base64 = reader.result.toString()
            this.anuncio.contenido = base64
            this.anuncio.tipoContenido = nam
          }
        }
        this.upload = true
      }
      else {
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
  }

  //metodos para cargar las listas del formulario 
  cargarAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe(res => {
      Object.assign(this.areas, res)
    })
  }

  //metodo que carga la lista de roles segun el area
  cargarRolesArea(areaid: string) {
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(areaid).subscribe(res => {
      Object.assign(this.roles, res)
    })
  }

  //metodo para cargar los roles a un anuncios
  agregarRol(areaid: string) {
    //realizamos una verificacion de las areas para agregarlas a los estados
    if (this.estados) {
      var band = false
      this.estados.forEach((element: any) => {
        if (element.area._id == areaid) band = true
      })
      //en caso de que ningun estado sea igual se procede a crear un estado y asignarle el area
      if (!band) {
        this.estado.area._id = areaid
        this.estados.push(this.estado)
        this.estado = new Estado()
        this.estado.area = new Area();
      }
    }

    //realizamos una verificacion para no guardar dos veces el mismo destinatario

    band = false
    this.anuncio.destinatarios.forEach((element: any) => {
      if (element._id == this.rol._id) band = true
    })

    if (!band && JSON.stringify(this.rol) != "{}") {
      this.anuncio.destinatarios.push(this.rol)
      this.rol = new Rol();
      console.log(this.anuncio.destinatarios)
    }
  }

  //metodo para cargar medios
  agregarMedios() {
    if (this.medio != "") this.anuncio.mediosTransmision.push(this.medio)
    console.log(this.anuncio.mediosTransmision)

  }


  guardarAnuncio(estado: string) {

    //agregamos los estados al anuncio 
    this.estados.forEach((element: any) => { element.estado = estado })
    this.anuncio.estados = this.estados

    //agragamos el redactor al anuncio 
    var id = this.loginService.idLogged()
    if (id != null) this.anuncio.redactor._id = id

    //guardamos el anuncio 
    this.anuncioService.addAnuncio(this.anuncio).subscribe(res => {
      //en este momento generamos los qr para que se acoplen a cada host en caso de que se cambie de host
      this.anuncio._id = res.id;
        //generamos el url para el qr con el host actual, la direccion del componente y el parametro del id del anuncio
        var text = window.location.host + '/recursos/' + this.anuncio._id;
        console.log(text);
        this.qrService.generarQr(text, 'url').subscribe((res) => {
          this.anuncio.codigoQR = res.url;
          this.actualizarAnuncio();
          this.anuncio = new Anuncio();
        });
    })
  }

  actualizarAnuncio() {
    this.anuncioService.updateAnuncio(this.anuncio).subscribe(res => { });
    this.anuncio = new Anuncio();
  }


  //------------------------------METODOS PAR CARGAR MIS ANUNCIOS----------------------------
  mostrarMisAnuncios() {
    this.anuncios = new Array<Anuncio>()
    var userid = this.loginService.idLogged()
    if (userid) {
      this.anuncioService.getAnunciosByUser(userid).subscribe(res => {
        Object.assign(this.anuncios, res);
        this.anuncios.forEach(anuncio => {
          var fecha = new Date(anuncio.fechaSalidaVigencia).toISOString()
          anuncio.fechaSalidaVigencia = new Date(fecha.substring(0, 10));
        })
      })
    }
  }

  cambiarEstado(anuncio: Anuncio, estado: string) {
    anuncio.estados.forEach((element:Estado)=>{ element.estado = estado})
    Object.assign(this.anuncio,anuncio)
    this.actualizarAnuncio();
    //editar -> solo  lo ve el usuario creador
    //confeccionado -> se lo envia al encargado
    //valido -> lo ven todos
    //denegado -> denegado para editar
    //cancelado -> nadie mas que el encargado lo ve
  }
}
