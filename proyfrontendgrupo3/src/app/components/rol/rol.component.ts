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
  constructor(private rolService:RolService) { }
  
  ngOnInit(): void {
  }

}
