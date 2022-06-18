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
  persona: Persona = new Persona();

  constructor(private personaService: PersonaService) {}

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
  
  ngOnInit(): void {
  }

}
