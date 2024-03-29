import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Anuncio } from 'src/app/models/anuncio';
import { Area } from 'src/app/models/area';
import { Estado } from 'src/app/models/estado';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AreaService } from 'src/app/services/area.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu-anuncios',
  templateUrl: './menu-anuncios.component.html',
  styleUrls: ['./menu-anuncios.component.css'],
})
export class MenuAnunciosComponent implements OnInit {
  //variables para cargar anuncios dirigidos a los roles de un usuario
  anuncios: Array<Anuncio> = [];
  fecha!: Date;
  roles: Array<Rol> = [];
  rolesId: Array<string> = [];
  anunciosFiltrados: Array<Anuncio> = [];
  rolElegido: string = '';
  area: Area = new Area();
  rolesFiltrados: Array<string> = [];
  fechaFiltro!: Date;
  fecha2: Date = new Date();

  //valida los recursos que se mostraran en la visata
  contenidos!: Array<SafeResourceUrl>;

  //valida los recursos del filtro de anuncios historicos por roles
  contenidosHistoricos!: Array<SafeResourceUrl>;

  constructor(private anuncioService: AnuncioService,private loginService: LoginService,private router: Router,private sanitizer: DomSanitizer) {
    this.anuncios = new Array<Anuncio>();
    this.fecha = new Date();
    this.roles = new Array<Rol>();
    this.rolesId = new Array<string>();
    this.anunciosFiltrados = new Array<Anuncio>();
    this.area = new Area();
    this.rolesFiltrados = new Array<string>();
  }

  ngOnInit(): void {
    this.cargarMisRoles();
    this.cargarMiArea();

    if (this.roles[0].nombre.toLowerCase() == 'encargado' || this.roles[0].nombre.toLowerCase() == 'administrador' || this.roles[0].nombre.toLowerCase() == 'autoridad') {
      this.router.navigate(['/Login']);
    }

    this.cargarAnunciosVigentes();
  }
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }

  cargarMiArea() {
    var areaLogin = this.loginService.areaLogged();
    Object.assign(this.area, areaLogin);
  }

  cargarAnunciosVigentes() {
    this.anuncios = new Array<Anuncio>();

    //cargo la fecha de hoy para cargar los anuncios vigentes
    this.fecha = new Date();

    //cargo los id para realizar la busqueda
    this.roles.forEach((element: any) => {
      this.rolesId.push(element._id);
    });

    //thisfecha <= fechaSalida
    this.contenidos = new Array<SafeResourceUrl>();
    this.anuncioService.getAnunciosByRoles(this.rolesId, this.fecha, this.area._id).subscribe((res) => {
      Object.assign(this.anuncios, res);
      this.anuncios.forEach((anuncio) => {
        this.contenidos.push(this.sanitizer.bypassSecurityTrustResourceUrl(anuncio.contenido))
      })
    });
  }

  //metodo para cargar los anuncios historicos de el rol de una persona
  cargarAnunciosbyRol() {
    this.anunciosFiltrados = new Array<Anuncio>();

    //cargo una fecha de un pasado distante para reutilizar el codigo
    this.fecha = new Date('Jan 1 2000');

    //uso una fecha para sacar los anuncios vigentes
    this.fechaFiltro = new Date();

    this.contenidosHistoricos = new Array<SafeResourceUrl>();
    this.anuncioService.getAnunciosByRoles(this.rolesFiltrados, this.fecha, this.area._id).subscribe((res) => {
        res.forEach((resAnuncio: Anuncio) => {
          //guardo la fecha para filtrar solo los que ya no tienen vigencia
          this.fecha2 = new Date(resAnuncio.fechaSalidaVigencia);
          if (this.fecha2 < this.fechaFiltro) {
            this.anunciosFiltrados.push(resAnuncio);
            this.contenidosHistoricos.push(this.sanitizer.bypassSecurityTrustResourceUrl(resAnuncio.contenido))
          }
        });
      });
  }

  filtrarAnuncios() {
    this.rolesFiltrados = new Array<string>();
    this.rolesFiltrados.push(this.rolElegido);
    this.cargarAnunciosbyRol();
  }
}
