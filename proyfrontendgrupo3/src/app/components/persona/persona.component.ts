import { Area } from 'src/app/models/area';
import { Rol } from './../../models/rol';
import { AreaService } from './../../services/area.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  //variable usada para obtener todas las personas
  personas!: Array<Persona>;

  //variable usada para crear o editar una persona
  persona!: Persona;

  //variable usada para agregar un nuevo rol
  rol!: Rol;

  //variable usada para seleccionar un area
  area!: Area;

  //variable usada para obtener todas las areas
  areas!: Array<Area>;

  //variable usada para preparar el formulario para crear una nueva persona
  modoEditar!: boolean;

  //variable usada para preparar el formulario para editar una persona
  modoCrear!: boolean;

  viewPassword!: boolean;

  roles!: Array<Rol>;

  constructor(
    private personaService: PersonaService,
    private areaService: AreaService, private router: Router, private loginService: LoginService
  ) {
    this.modoEditar = false;
    this.modoCrear = false;

    this.personas = new Array<Persona>();

    this.persona = new Persona();
    this.persona.roles = new Array<Rol>();
    this.persona.area = new Area();

    this.rol = new Rol();

    this.area = new Area();

    this.areas = new Array<Area>();

    this.viewPassword = false;

    this.roles = new Array<Rol>()
  }

  //agrega una persona a la base de datos
  guardarPersona() {
    this.personaService.addPersona(this.persona).subscribe(() => {
      this.getPersonas();
      this.modoCrear = false;
      this.rol = new Rol();
      this.area = new Area();
    });
  }

  //elimina una persona en la base de datos
  borrarPersona() {
    this.personaService.deletePasaje(this.persona).subscribe(() => {
      this.getPersonas();
    });
  }

  //prepara los datos del formulario para editar una persona
  editarPersona(persona: Persona) {
    this.modoEditar = true;
    this.modoCrear = false;
    Object.assign(this.persona, persona);
    Object.assign(this.persona.area, persona.area)
    this.getRolesArea();
  }

  //obtiene todos los roles de un area
  getRolesArea() {
    this.area.roles = new Array<Rol>();
    this.areaService.getRolesArea(this.persona.area._id).subscribe((res) => {
      Object.assign(this.area.roles, res);
    });
  }

  //agrega un rol al Array de roles
  agregarRol(id: string) {
    if (this.persona.roles.findIndex((rol) => rol._id === id) === -1)
      var rol = this.area.roles.find((rol) => {
        return rol._id === id;
      });
    if (rol) this.persona.roles.push(rol);
  }

  //actualiza los datos de una persona
  actualizarPersona(persona: Persona) {
    this.personaService.updatePasaje(persona).subscribe(() => {
      this.getPersonas();
      this.modoEditar = false;
      this.rol = new Rol();
      this.area = new Area();
    });
  }

  //obtiene todas las personas
  getPersonas() {
    this.personas = new Array<Persona>();
    this.personaService.getPersonas().subscribe((res) => {
      Object.assign(this.personas, res);
    });
  }

  //instancia las variables a utilizar para crear una nueva persona
  activarModoCrear() {
    this.modoEditar = false;
    this.modoCrear = true;
    this.persona = new Persona();
    this.persona.roles = new Array<Rol>();
    this.persona.area = new Area();
  }

  //obtiene todas las areas
  getAreas() {
    this.areaService.getAreas().subscribe((res) => {
      Object.assign(this.areas, res);
    });
  }

  //elimina un rol del array de roles
  quitarRol(pos: number) {
    this.persona.roles.splice(pos, 1);
  }

  //cambia el estado de una persona
  cambiarEstadoPersona(persona: Persona) {
    persona.estado = !persona.estado;
    this.personaService.updatePasaje(persona).subscribe();
  }

  ngOnInit(): void {
    //validacion de peticion
    this.cargarMisRoles();
    if(this.roles[0].nombre != "administrador"){
      this.router.navigate(['/Login'])
    }
    this.getPersonas();
    this.getAreas();
  }

  //metodo para cargar mis roles
  cargarMisRoles() {
    var rolesLogin = this.loginService.rolLogged();
    Object.assign(this.roles, rolesLogin);
  }
}
