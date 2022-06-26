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

  anuncios: Array<Anuncio> = [];
  anuncio: Anuncio = new Anuncio();
  rolArea: AreaRol = new AreaRol();
  roles: Array<Rol> = []

  constructor(private anuncioService: AnuncioService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarAnuncios();
  }

  cargarAnuncios(){
    var areaLogin = this.loginService.areaLogged();
    var rolesLogin = this.loginService.rolLogged();
    if(rolesLogin != null){
      Object.assign(this.rolArea.roles,rolesLogin);
    }
    if(areaLogin != null){ 
      Object.assign(this.rolArea.area, areaLogin)}
    
    this.anuncioService.getAnunciosByRol(this.rolArea).subscribe(res =>{
      Object.assign(this.anuncios,res)
    })
  }
}
