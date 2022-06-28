import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  roles: Array<Rol> = [];
  rol: Rol = new Rol();
  constructor(private rolService: RolService) {
    
  }
  guardarRol(){
    this.rolService.addRol(this.rol).subscribe((res) => {
      this.rol = new Rol();
      this.getRoles();
    });
  }
  borrarRol(rol: Rol) {
    this.rolService.deleteRol(rol).subscribe((res) => {
      this.rol = new Rol();
      this.getRoles();
    })
  }
  actualizarRol(rol: Rol){
    this.rolService.updateRol(rol).subscribe((res) => {
      this.getRoles();
      this.rol = new Rol();
    })
  }
  getRoles(){
    this.roles = new Array<Rol>();
    this.rolService.getRoles().subscribe( respuesta => {
     respuesta.forEach((element: any) => {
      this.rol = new Rol();
      Object.assign(this.rol,element)
      this.roles.push(this.rol);
      this.rol = new Rol();
     })
    })
  }
  ngOnInit(): void {
    this.getRoles();
  }

}
