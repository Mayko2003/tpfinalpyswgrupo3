import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./menu-anuncios.component.css']
})
export class MenuAnunciosComponent implements OnInit {

  //variables para cargar anuncios dirigidos a los roles de un usuario 
  anuncios: Array<Anuncio> = [];
  fecha!: Date;
  roles: Array<Rol> = [];
  rolesId: Array<string> = [];
  anunciosFiltrados: Array<Anuncio> = [];
  rolElegido: string = ""
  area: Area = new Area()
  rolesFiltrados: Array<string> = [];
  fechaFiltro!: Date
  fecha2: Date = new Date()

  constructor(private anuncioService: AnuncioService, private loginService: LoginService, private router: Router) {
    this.anuncios = new Array<Anuncio>()
    this.fecha = new Date()
    this.roles = new Array<Rol>()
    this.rolesId = new Array<string>()
    this.anunciosFiltrados = new Array<Anuncio>()
    this.area = new Area();
    this.rolesFiltrados = new Array<string>()
  }

  ngOnInit(): void {
    this.cargarMisRoles();
    this.cargarMiArea();

    if (this.roles[0].nombre == "encargado" || this.roles[0].nombre == "administrador" || this.roles[0].nombre == "autoridad") {
      this.router.navigate(['/Login'])
    }


    this.cargarAnunciosVigentes();
  }

  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }

  cargarMiArea() {
    var areaLogin = this.loginService.areaLogged()
    Object.assign(this.area, areaLogin)
  }

  cargarAnunciosVigentes() {
    this.anuncios = new Array<Anuncio>()

    //cargo la fecha de hoy para cargar los anuncios vigentes
    this.fecha = new Date()

    //cargo los id para realizar la busqueda
    this.roles.forEach((element: any) => { this.rolesId.push(element._id) })

    //thisfecha <= fechaSalida
    this.anuncioService.getAnunciosByRoles(this.rolesId, this.fecha, this.area._id).subscribe(res => {
      Object.assign(this.anuncios, res)
      console.log(this.anuncios);
    })
  }

  //metodo para cargar los anuncios historicos de el rol de una persona
  cargarAnunciosbyRol() {
    this.anunciosFiltrados = new Array<Anuncio>();

    //cargo una fecha de un pasado distante para reutilizar el codigo 
    this.fecha = new Date('Jan 1 2000')


    //uso una fecha para sacar los anuncios vigentes
    this.fechaFiltro = new Date()

    this.anuncioService.getAnunciosByRoles(this.rolesFiltrados, this.fecha, this.area._id).subscribe(res => {
      res.forEach((resAnuncio: Anuncio) => {
        //guardo la fecha para filtrar solo los que ya no tienen vigencia
        this.fecha2 = new Date(resAnuncio.fechaSalidaVigencia)
        if (this.fecha2 < this.fechaFiltro) {
          this.anunciosFiltrados.push(resAnuncio);
        }

      })
    })
  }

  filtrarAnuncios() {
    this.rolesFiltrados = new Array<string>()
    this.rolesFiltrados.push(this.rolElegido);
    this.cargarAnunciosbyRol()

  }

}
