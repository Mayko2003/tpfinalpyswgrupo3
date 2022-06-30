import { Area } from 'src/app/models/area';
import { Rol } from './../../models/rol';
import { AreaService } from './../../services/area.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

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

  //variable usada para obtener todos los roles
  roles!: Array<Rol>;

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

  constructor(
    private personaService: PersonaService,
    private areaService: AreaService
  ) {
    this.modoEditar = false;
    this.modoCrear = false;

    this.personas = new Array<Persona>();

    this.persona = new Persona();
    this.persona.roles = new Array<Rol>();
    this.persona.area = new Area();

    this.roles = new Array<Rol>();
    this.rol = new Rol();

    this.areas = new Array<Area>();
    this.area = new Area();
  }

  //agrega una persona a la base de datos
  guardarPersona() {
    this.persona.area = this.area;
    this.persona.roles = this.roles;
    this.personaService.addPersona(this.persona).subscribe();
    this.getPersonas();
    this.modoCrear = false
  }

  //elimina una persona en la base de datos
  borrarPersona(persona: Persona) {
    this.personaService.deletePasaje(persona).subscribe(() => {
      this.getPersonas();
    });
  }

  //prepara los datos del formulario para editar una persona
  editarPersona(persona: Persona) {
    this.modoEditar = true;
    this.persona = persona;
  }

  //actualiza los datos de una persona
  actualizarPersona(persona: Persona) {
    this.personaService.updatePasaje(persona).subscribe();
    this.modoEditar = false
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
    this.modoCrear = true
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

  //obtiene todos los roles de un area
  getRolesArea() {
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(this.area._id).subscribe((res) => {
      Object.assign(this.roles, res);
    });
  }

  //agrega un rol al Array de roles
  agregarRol(id: string) {
    if (this.persona.roles.findIndex((rol) => rol._id === id) === -1)
      var rol = this.roles.find((rol) => {
        return rol._id === id;
      });
    if (rol) this.persona.roles.push(rol);
  }

  //elimina un rol del array de roles
  quitarRol(pos: number) {
    this.persona.roles.splice(pos, 1);
  }

  //cambia el estado de una persona
  cambiarEstadoPersona(persona: Persona) {
    persona.estado = !persona.estado
    this.personaService.updatePasaje(persona).subscribe();
  }

  ngOnInit(): void {
    this.getPersonas();
    this.getAreas();
  }
}
