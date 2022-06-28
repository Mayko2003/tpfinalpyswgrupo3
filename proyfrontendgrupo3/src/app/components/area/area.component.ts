import { Rol } from 'src/app/models/rol';
import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
 
  areas:Array<Area>= []
  area: Area = new Area()
  rol: Rol = new Rol()
  constructor(private areaService: AreaService) { }
  
  guardarArea(){
    this.areaService.addArea(this.area).subscribe();
    this.area = new Area();
  }
  
  borrarArea(area: Area){
    this.areaService.deleteArea(area).subscribe()
  }

  actualizarArea(area: Area){
    this.areaService.updateArea(area).subscribe()
  }

  getAreas(){
    this.areas = new Array<Area>();
    this.areaService.getAreas().subscribe( respuesta => {
     respuesta.forEach((element: any) => {
      this.area = new Area();
      Object.assign(this.area,element)
       this.areas.push(this.area);
       this.area = new Area();
     })
    })
  }
  ngOnInit(): void {
    this.getAreas();
  }

}
