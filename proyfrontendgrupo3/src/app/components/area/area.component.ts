import { Rol } from 'src/app/models/rol';
import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  //variables para cargar un area
  area!: Area;

  //arreglo para cargar todas las areas
  areas!: Array<Area>;

  //variables para cargar un rol
  rol!: Rol;

  //variable que activa el modo editar
  modoEditar!: boolean;

  //variable que activa el modo crear
  modoCrear!: boolean;

  roles!: Array<Rol>;

  constructor(
    private areaService: AreaService,
    private rolService: RolService, private router: Router, private loginService: LoginService

  ) {
    this.area = new Area();
    this.area.roles = new Array<Rol>();

    this.rol = new Rol();

    this.modoEditar = false;
    this.modoCrear = false;

    this.roles = new Array<Rol>()
  }

  //metodos para cargar un ROL
  agregarRol() {
    if (!this.area.roles) {
      this.area.roles = new Array<Rol>();
      this.rolService.addRol(this.rol).subscribe((res) => {
        Object.assign(this.area.roles, [res]);
        this.rol = new Rol();
      });
    } else {
      if (this.area.roles.findIndex((rol) => rol.nombre === this.rol.nombre) === -1) {
        var rol = this.area.roles.find((rol) => {
          return rol._id === this.rol.nombre;
        });
        if (!rol)
          this.rolService.addRol(this.rol).subscribe((res) => {
            Object.assign(this.rol, res);
            this.area.roles.push(this.rol);
            this.rol = new Rol();
          });
      }
    }
  }

  prepararCreacion() {
    this.modoCrear = true;
    this.modoEditar = false;
    this.area = new Area();
  }

  quitarRol(pos: number, rol: Rol) {
    this.area.roles.splice(pos, 1);
    this.rolService.deleteRol(rol).subscribe();
  }

  actualizarRol(rol: Rol) {
    this.rolService.updateRol(rol).subscribe();
  }

  //metodos manejar un AREA
  guardarArea() {
    this.areaService.addArea(this.area).subscribe((res) => {
      this.area = new Area();
      this.area.roles = new Array<Rol>();
      this.getAreas();
      this.modoCrear = false;
    });
  }

  borrarArea() {
    this.areaService.deleteArea(this.area).subscribe((res) => {
      this.getAreas();
    });
  }

  editarArea(area: Area) {
    this.area = area;
    this.area.roles = area.roles;
    this.modoEditar = true;
  }

  actualizarArea() {
    Object.assign(this.area.roles, this.area.roles);
    this.areaService.updateArea(this.area).subscribe((res) => {
      this.getAreas();
    });
  }

  getAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe((respuesta) => {
      respuesta.forEach((element: any) => {
        this.area = new Area();
        Object.assign(this.area, element);
        this.areas.push(this.area);
        this.area = new Area();
      });
    });
  }

  getRolesArea(area: Area) {
    // this.area.roles = new Array<Rol>();
  }

  ngOnInit(): void {
  //validacion de peticion
  this.cargarMisRoles();
  if(this.roles[0].nombre != "administrador"){
      this.router.navigate(['/Login'])
  }
    this.getAreas();
  }

  //metodo para cargar mis roles
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }

}
