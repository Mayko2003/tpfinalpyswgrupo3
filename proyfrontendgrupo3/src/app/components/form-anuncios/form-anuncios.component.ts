import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Estado } from 'src/app/models/estado';
import { Persona } from 'src/app/models/persona';
import { Recurso } from 'src/app/models/recurso';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { EmailService } from 'src/app/services/email.service';
import { LoginService } from 'src/app/services/login.service';
import { QrService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-form-anuncios',
  templateUrl: './form-anuncios.component.html',
  styleUrls: ['./form-anuncios.component.css'],
})
export class FormAnunciosComponent implements OnInit {
  //variable usada para guardar o editar un anuncio
  anuncio: Anuncio = new Anuncio();

  //variable usada para cargar los anuncios del Usuario
  anuncios: Array<Anuncio> = [];

  //variable para cargar recursos de la
  recurso!: Recurso;

  //variable para agregar las areas y los roles
  areas: Array<Area>;
  area: Area = new Area();
  roles: Array<Rol>;
  rol: Rol = new Rol();

  //para guardar estados de
  estados: Array<Estado>;
  estado: Estado = new Estado();

  //varibale para asegurar la subida de archivos
  upload: boolean = false;

  //para guardar los medios de transmicion
  medios: Array<string> = ['facebook', 'instagram', 'twitter'];
  medio: string = '';

  modoCrear!: boolean;
  modoEditar!: boolean;

  //valida los recursos que se mostraran en la visata
  contenidos!: Array<SafeResourceUrl>;

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private areaService: AreaService, private qrService: QrService, private router: Router, private activatedRoute: ActivatedRoute, private emailService: EmailService, private sanitizer: DomSanitizer) {
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
    //validacion de peticion
    this.cargarMisRoles();
    if (this.roles[0].nombre == 'encargado' || this.roles[0].nombre == 'administrador' || this.roles[0].nombre == 'autoridad') {
      this.router.navigate(['/Login']);
    }

    this.cargarAreas();
    this.mostrarMisAnuncios();
  }

  //metodo para cargar mis roles
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }

  //-----------------------METODOS PARA GUARDAR/EDITAR MIS ANUNCIOS---------------------

  //metodo para cargar contenido y los recursos en el anuncio
  getFile(e: any, accion: string) {
    if(accion == 'contenido' && e.target.files.length == 0) this.upload = false;
    //agregar tipo de archivos
    var Extensions = ['png', 'jpg', 'jpeg', 'pdf', 'gif', 'html', 'mp4', 'avi', 'webm',];

    for (var i = 0; i < e.target.files.length; i++) {
      //controlamos el tamaño
      if (e.target.files[i].size / 1024 / 1024 > 8) {
        alert('El tamaño del archivo supera los 8 MB');
        this.upload = false;
        return;
      }

      //controlamos las extenciones
      var nam: string = e.target.files[0].name.split('.').pop();
      if (!Extensions.includes(nam)) {
        alert('La extencion del archivo no es reconocible');
        this.upload = false;
        return;
      }

      //convertimos a base 64 pero antes controlamos el cual input es
      if (accion == 'contenido') {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        let base64 = '';
        reader.onload = () => {
          if (reader.result != null) {
            base64 = reader.result.toString();
            this.anuncio.contenido = base64;
            this.anuncio.tipoContenido = nam;
          }
        };
        this.upload = true;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        let base64 = '';
        reader.onload = () => {
          if (reader.result != null) {
            base64 = reader.result.toString();
            this.recurso = new Recurso();
            this.recurso.recurso = base64;
            this.recurso.tipo = nam;
            this.anuncio.recursos.push(this.recurso);
          }
        };
      }
    }
  }

  //metodos para cargar las listas del formulario
  cargarAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe((res) => {
      Object.assign(this.areas, res);
    });
  }

  //metodo que carga la lista de roles segun el area
  cargarRolesArea(areaid: string) {
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(areaid).subscribe((res) => {
      Object.assign(this.roles, res);
    });
  }

  //metodo para cargar los roles a un anuncios
  agregarRol(areaid: string) {
    //realizamos una verificacion de las areas para agregarlas a los estados
    if (this.estados) {
      var band = false;
      this.estados.forEach((element: any) => {
        if (element.area._id == areaid) band = true;
      });
      //en caso de que ningun estado sea igual se procede a crear un estado y asignarle el area
      if (!band) {
        this.estado.area._id = areaid;
        this.estados.push(this.estado);
        this.estado = new Estado();
        this.estado.area = new Area();
      }
    }

    //realizamos una verificacion para no guardar dos veces el mismo destinatario

    band = false;
    this.anuncio.destinatarios.forEach((element: any) => {
      if (element._id == this.rol._id) band = true;
    });

    if (!band && JSON.stringify(this.rol) != '{}') {
      var rolC = this.roles.find((r) => r._id == this.rol._id);
      if (rolC) this.anuncio.destinatarios.push(rolC);
      this.rol = new Rol();
    }
  }

  //elimina un rol de los destinatarios del anuncio
  quitarRol(pos: number) {
    this.anuncio.destinatarios.splice(pos, 1);
  }

  //metodo para cargar medios
  agregarMedios() {
    if (this.medio != '') this.anuncio.mediosTransmision.push(this.medio);
  }

  quitarMedio(pos: number) {
    this.anuncio.mediosTransmision.splice(pos, 1)
  }

  guardarAnuncio() {

    if (this.anuncio._id == null || this.anuncio._id == "") {
      //agregamos los estados al anuncio 
      this.estados.forEach((element: any) => { element.estado = "editar" })
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
        this.qrService.generarQr(text, 'url').subscribe((res) => {
          this.anuncio.codigoQR = res.url;
          this.actualizarAnuncio();
          this.anuncio = new Anuncio();
        });
        this.mostrarMisAnuncios()
      });

    } else {
      this.actualizarAnuncio();
    }
    this.clearForm();
  }

  actualizarAnuncio() {
    this.anuncioService.updateAnuncio(this.anuncio).subscribe((res) => { });
    this.anuncio = new Anuncio();
  }

  clearForm() {
    if(this.modoCrear) return;
    this.anuncio = new Anuncio();
    this.estados = new Array<Estado>();
    this.anuncio.destinatarios = new Array<Rol>();
    this.anuncio.mediosTransmision = new Array<string>();
    this.anuncio.recursos = new Array<Recurso>();
    this.anuncio.estados = new Array<Estado>();
    this.anuncio.redactor = new Persona();

    this.estado = new Estado();
    this.estados = new Array<Estado>();
    this.estado.area = new Area();
    this.rol = new Rol();
    this.medio = '';
    this.upload = false;
    this.modoCrear = true;
    this.modoEditar = false;

    this.clearFiles();
  }

  clearFiles() {
    var contenido = document.getElementById('contenido') as HTMLInputElement;
    if (contenido != null) contenido.value = '';

    var recursos = document.getElementById('recurso') as HTMLInputElement;
    if (recursos != null) {
      recursos.value = '';
      this.recurso = new Recurso();
    }
  }

  //------------------------------METODOS PAR CARGAR MIS ANUNCIOS----------------------------
  mostrarMisAnuncios() {
    this.anuncios = new Array<Anuncio>();
    this.contenidos = new Array<SafeResourceUrl>()
    var userid = this.loginService.idLogged();
    if (userid) {
      this.anuncioService.getAnunciosByUser(userid).subscribe((res) => {
        Object.assign(this.anuncios, res);
        this.anuncios.forEach((anuncio) => {
          var fecha = new Date(anuncio.fechaSalidaVigencia).toISOString();
          anuncio.fechaSalidaVigencia = new Date(fecha.substring(0, 10));
          this.contenidos.push(this.sanitizer.bypassSecurityTrustResourceUrl(anuncio.contenido))
        });
      });
    }
  }

  publicarAnuncio(anuncio: Anuncio) {
    anuncio.estados.forEach((element: Estado) => { element.estado = "confeccionado" })
    Object.assign(this.anuncio, anuncio)
    this.actualizarAnuncio();

    //enviar correo
    anuncio.estados.forEach((element: Estado) => {
      this.areaService.getEncargado(element.area._id).subscribe(res => {
        var email = res.email
        var text = 'El anuncio ' + anuncio.titulo + ' ha sido confeccionado por ' + anuncio.redactor.nombre + ' ' + anuncio.redactor.apellido + ' y esta pendiente de ser validado por usted'
        // this.emailService.send(email,text).subscribe(res=>{
        // })
      })
    })
  }

  getMimeType(dataURI:string):string{
    return dataURI.split(',')[0].split(':')[1].split(';')[0];
  }

  dataURItoBlob(dataURI:any):Blob {
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = this.getMimeType(dataURI);

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  setFiles(){
    //contenindo
    var input = document.getElementById('contenido') as HTMLInputElement;
    const base64 = this.anuncio.contenido;
    const blob = this.dataURItoBlob(base64);
    const file = new File([blob], 'contenido.'+this.anuncio.tipoContenido, { type: this.getMimeType(base64) });
    var container = new DataTransfer();
    container.items.add(file);
    input.files = container.files;

    //recursos
    input = document.getElementById('recurso') as HTMLInputElement;
    container = new DataTransfer();
    this.anuncio.recursos.forEach((recurso: Recurso) => {
      const base64 = recurso.recurso;
      const blob = this.dataURItoBlob(base64);
      const file = new File([blob], 'recurso.'+recurso.tipo, { type: this.getMimeType(base64) });
      container.items.add(file);
    })
    input.files = container.files;
  }

  editarAnuncio(anuncio: Anuncio) {
    this.modoCrear = false
    this.modoEditar = true
    Object.assign(this.anuncio, anuncio)
    this.upload = true
    this.setFiles()
  }
}
