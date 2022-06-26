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

  constructor(public loginService: LoginService) {
    this.roles = loginService.rolLogged();
    if (this.roles)
      if (this.roles[0] == 'administrador')
        this.userImg = 'assets/images/admin.png';
      else this.userImg = 'assets/images/default-user.jpg';
  }

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
  }
}
