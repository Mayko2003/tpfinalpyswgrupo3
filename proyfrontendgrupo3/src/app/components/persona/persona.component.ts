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

  personas: Array<Persona> = [];
  roles: Array<Rol> = [];
  areas: Array<Area> = [];
  persona: Persona = new Persona();

  constructor(private personaService: PersonaService, private areaService:AreaService) {}

  guardarPersona(){
    this.personaService.addPersona(this.persona).subscribe();
    this.persona = new Persona();
  }
  
  borrarPersona(persona: Persona){
    this.personaService.deletePasaje(persona).subscribe()
  }

  actualizarPersona(persona: Persona){
    this.personaService.updatePasaje(persona).subscribe()
  }

  getPersonas(){
    this.personas = new Array<Persona>();
    this.personaService.getPersonas().subscribe( res => {
     res.forEach((element: any) => {
      this.persona = new Persona();
      Object.assign(this.persona,element)
      this.personas.push(this.persona);
     })
    })
  }

  getAreas() {
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe();
  }
  
  ngOnInit(): void {
  }

}
