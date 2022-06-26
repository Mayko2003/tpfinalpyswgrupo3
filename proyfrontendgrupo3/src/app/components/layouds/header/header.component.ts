import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  roles!: any

  constructor(public loginService: LoginService) {
    this.roles = loginService.rolLogged();
  }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
  }

}
