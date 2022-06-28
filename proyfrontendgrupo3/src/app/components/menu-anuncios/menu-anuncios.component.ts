import { Component, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/models/anuncio';
import { AreaRol } from 'src/app/models/area-rol';
import { Rol } from 'src/app/models/rol';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu-anuncios',
  templateUrl: './menu-anuncios.component.html',
  styleUrls: ['./menu-anuncios.component.css']
})
export class MenuAnunciosComponent implements OnInit {

  //variables para cargar anuncios dirigidos a los roles de un usuario 
  anuncios: Array<Anuncio> = [];
  rolArea: AreaRol = new AreaRol();
  fecha!: Date;


  constructor(private anuncioService: AnuncioService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  cargarAnuncios(){
    //cargo el area y los reles logeados
    var areaLogin = this.loginService.areaLogged();
    var rolesLogin = this.loginService.rolLogged();
    
    if(rolesLogin != null){
      Object.assign(this.rolArea.roles,rolesLogin);
    }
    if(areaLogin != null){ 
      Object.assign(this.rolArea.area, areaLogin)}
    
    //cargo la fecha de hoy para cargar los anuncios vigentes
    this.fecha = new Date()

    // thisfecha <= fechaSalida
    this.anuncioService.getAnunciosByRoles(this.rolArea,this.fecha).subscribe(res =>{
      Object.assign(this.anuncios,res)
    })
  }

  //Búsquedas avanzadas, se podrá realizar por destinatario, fechas, medio de publicación, texto, 
  //tipo de contenido, estado, redactor o combinaciones de todas las anteriores.
}
