import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
 
  //variables para cargar un area
  area:Area =new Area()

  //arreglo para cargar todas las areas
  areas:Array<Area> = []

  //arreglo para cargar los roles de un areas
  roles:Array<Rol> = []

  //variables para cargar un rol
  rol: Rol = new Rol()

  constructor(private areaService: AreaService, private rolService: RolService) { }
  
  //metodos manejar un AREA
  guardarArea(){
    this.areaService.addArea(this.area).subscribe(res => {
      this.getAreas();
    });
    this.area = new Area();
  }
  
  borrarArea(area: Area){
    this.areaService.deleteArea(area).subscribe(res =>{
      this.getAreas();
    })
  }

  actualizarArea(area: Area){
    this.areaService.updateArea(area).subscribe(res => {
      this.getAreas();
    })
  }

  getAreas(){
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe( respuesta => {
     respuesta.forEach((element: any) => {
      this.area = new Area();
      Object.assign(this.area,element)
      this.areas.push(this.area);
     })
    })
  }

  getRolesArea(area: Area){
    this.roles = new Array<Rol>();
    this.areaService.getRolesArea(area._id).subscribe(res => {
      Object.assign(this.roles,res)
    })
  }

  //metodos para cargar un ROL
  guardarRol(){
    this.rolService.addRol(this.rol).subscribe(res => {
    });
    this.rol = new Rol();
  }
  borrarRol(rol:Rol){
    this.rolService.deleteRol(rol).subscribe( res => {
      
    })
  }
  actualizarRol(rol: Rol){
    this.rolService.updateRol(rol).subscribe( res => {

    })
  }

  ngOnInit(): void {
  }

}
