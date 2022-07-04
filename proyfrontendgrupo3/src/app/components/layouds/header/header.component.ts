import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles!: any;
  area!: Area;
  userImg!: string;
  admin: boolean = false;
  encargado: boolean = false;
  autoridad: boolean = false;
  comun: boolean = false;

  constructor(public loginService: LoginService) {
    this.roles = loginService.rolLogged();
    this.area = new Area();
    Object.assign(this.area, loginService.areaLogged())
    console.log(this.area.nombre)
    if (this.roles) {
      this.roles.forEach((rol: any) => {
        switch (rol.nombre.toLowerCase()) {
          case 'administrador' || 'Administrador':
            this.admin = true;
            this.userImg = 'assets/images/admin.png';
            break;
          case 'encargado' || 'Encargado':
            this.encargado = true;
            this.userImg = 'assets/images/encargado.png';
            break;
          case 'autoridad' || 'Autoridad':
            this.autoridad = true;
            this.userImg = 'assets/images/autoridad.png';
            break
        }
      });
      if (!this.admin && !this.encargado && !this.autoridad){
        this.comun = true;
        this.userImg = 'assets/images/default-user.jpg';
      }
    }
  }

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
  }
}
