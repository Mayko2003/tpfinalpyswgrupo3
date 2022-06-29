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
  personas!: Array<Persona>;
  persona!: Persona;
  roles!: Array<Rol>;
  rol!: Rol;
  area!: Area;
  areas!: Array<Area>;
  modoEditar!: boolean;
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

  guardarPersona() {
    this.persona.area = this.area;
    this.persona.roles = this.roles;
    this.personaService.addPersona(this.persona).subscribe();
    this.getPersonas();
  }

  borrarPersona(persona: Persona) {
    this.personaService.deletePasaje(persona).subscribe();
    this.getPersonas();
  }

  editarPersona(persona: Persona) {
    this.modoEditar = true;
    this.persona = persona;
  }

  actualizarPersona(persona: Persona) {
    this.personaService.updatePasaje(persona).subscribe();
    this.modoEditar = false
  }

  getPersonas() {
    this.personas = new Array<Persona>();
    this.personaService.getPersonas().subscribe((res) => {
      Object.assign(this.personas, res);
    });
  }

  activarModoCrear() {
    this.modoCrear = true
    this.persona = new Persona();
    this.persona.roles = new Array<Rol>();
    this.persona.area = new Area();
  }

  getAreas() {
    this.areaService.getAreas().subscribe((res) => {
      Object.assign(this.areas, res);
    });
  }

  getRolesArea() {
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(this.area._id).subscribe((res) => {
      Object.assign(this.roles, res);
    });
  }

  agregarRol(id: string) {
    if (this.persona.roles.findIndex((rol) => rol._id === id) === -1)
      var rol = this.roles.find((rol) => {
        return rol._id === id;
      });
    if (rol) this.persona.roles.push(rol);
  }

  quitarRol(pos: number) {
    this.persona.roles.splice(pos, 1);
  }

  cambiarEstadoPersona(persona: Persona) {
    persona.estado = !persona.estado
    this.personaService.updatePasaje(persona).subscribe();
  }

  ngOnInit(): void {
    this.getPersonas();
    console.log(this.personas)
    this.getAreas();
  }
}
