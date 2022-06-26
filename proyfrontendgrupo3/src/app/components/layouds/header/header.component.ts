import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  roles!: any;
  userImg!: string;
  admin: boolean = false;
  encargado: boolean = false;
  comun: boolean = false;

  constructor(public loginService: LoginService) {
    this.roles = loginService.rolLogged();
    if (this.roles) {
      this.roles.forEach((rol:any) => {
        switch (rol.nombre) {
          case 'administrador':
            this.admin = true;
            break;
          case 'encargado':
            this.encargado = true;
            break;
          default:
            this.comun = true;
            break;
        }
      });
      if (this.admin)
          this.userImg = 'assets/images/admin.png';
      else
          this.userImg = 'assets/images/default-user.jpg';
    }
  }

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
  }
}
