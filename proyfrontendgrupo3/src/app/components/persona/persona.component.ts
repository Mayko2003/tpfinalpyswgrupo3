import { Area } from 'src/app/models/area';
import { Rol } from './../../models/rol';
import { AreaService } from './../../services/area.service';
import { RolService } from './../../services/rol.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas!: Array<Persona>;
  persona!: Persona;
  roles!: Array<Rol>;
  rol!: Rol;
  area!: Area;
  areas!: Array<Area>;

  constructor(private personaService: PersonaService, private areaService: AreaService) {
    this.personas = new Array<Persona>();
    this.persona = new Persona();
    this.persona.roles = new Array<Rol>();
    this.roles = new Array<Rol>();
    this.rol = new Rol();
    this.area = new Area();
    this.areas = new Array<Area>();
  }

  guardarPersona() {
    this.persona.area = this.area;
    this.persona.roles.push(this.rol)
    console.log(this.persona)
    this.personaService.addPersona(this.persona).subscribe();
    this.getPersonas()
  }
  
  borrarPersona(persona: Persona){
    this.personaService.deletePasaje(persona).subscribe()
    this.getPersonas()
  }

  actualizarPersona(persona: Persona){
    this.personaService.updatePasaje(persona).subscribe()
  }

  getPersonas(){
    this.personas = new Array<Persona>();
    this.personaService.getPersonas().subscribe( res => {
      Object.assign(this.personas,res)
    })
  }

  getAreas() {
    this.areaService.getAreas().subscribe((res) => {
      Object.assign(this.areas, res)
    });
  }

  getRolesArea() {
    this.areaService.getRolesArea(this.area._id).subscribe((res) => {
      Object.assign(this.roles, res)
    });
  }
  
  ngOnInit(): void {
    this.getAreas()
    this.getPersonas()
  }

}
