import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/services/login.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Persona = new Persona(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  user: Persona = new Persona();

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.returnUrl = '/home';
  }

  login() {
    this.loginService.login(this.userform.nombreUsuario, this.userform.contrasenia).subscribe(
        (result : any) => {
        Object.assign(this.user,result)
          if (this.user != null && this.user.estado) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("username", this.user.nombreUsuario);
            sessionStorage.setItem("userid", this.user._id);
            sessionStorage.setItem("roles", JSON.stringify(this.user.roles));
            sessionStorage.setItem("area",JSON.stringify(this.user.area.nombre));
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);

          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
}
