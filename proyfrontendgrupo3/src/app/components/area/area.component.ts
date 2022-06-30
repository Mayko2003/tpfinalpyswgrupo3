import { Rol } from 'src/app/models/rol';
import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';

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

  //arreglo para cargar los roles de un areas
  roles!: Array<Rol>;

  //variables para cargar un rol
  rol!: Rol;

  //variable que activa el modo editar
  modoEditar!: boolean;

  //variable que activa el modo crear
  modoCrear!: boolean;

  // variable que activa el modo alterar
  modoAltered!: boolean;


  constructor(
    private areaService: AreaService,
    private rolService: RolService
  ) {
    this.area = new Area();

    this.rol = new Rol();
    this.roles = new Array<Rol>();

    this.modoEditar = false;
    this.modoCrear = false;
  }

  //metodos para cargar un ROL
  agregarRol(nombre: string) {
    if (this.roles.length === 0) {
      this.rolService.addRol(this.rol).subscribe((res) => {
        Object.assign(this.rol, res);
        this.roles.push(this.rol);
        this.rol = new Rol();
      });
    } else {
      if (this.roles.findIndex((rol) => rol.nombre === nombre) === -1) {
        var rol = this.roles.find((rol) => {
          return rol._id === nombre;
        });
        if (!rol)
          this.rolService.addRol(this.rol).subscribe((res) => {
            Object.assign(this.rol, res);
            this.roles.push(this.rol);
            this.rol = new Rol();
          });
      }
    }
  }

  quitarRol(pos: number, rol: Rol) {
    this.roles.splice(pos, 1);
    this.rolService.deleteRol(rol).subscribe();
  }

  actualizarRol(rol: Rol) {
    this.rolService.updateRol(rol).subscribe();
  }

  //metodos manejar un AREA
  guardarArea() {
    this.area.roles = new Array<Rol>();
    Object.assign(this.area.roles, this.roles);
    this.areaService.addArea(this.area).subscribe((res) => {
      this.area = new Area();
      this.roles = new Array<Rol>();
      this.getAreas();
      this.modoCrear = false;
    });
  }

  borrarArea(area: Area) {
    this.areaService.deleteArea(area).subscribe((res) => {
      this.getAreas();
    });
  }

  editarArea(area: Area) {
    this.area = area;
    this.roles = area.roles;
    this.modoEditar = true;
  }

  actualizarArea() {
    Object.assign(this.area.roles,this.roles)
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
    this.roles = new Array<Rol>();
  }

  ngOnInit(): void {
    this.getAreas();
  }
}
