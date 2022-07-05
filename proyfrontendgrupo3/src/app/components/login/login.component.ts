import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
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
  
  }

  login() {
    this.loginService.login(this.userform.nombreUsuario, this.userform.contrasenia).subscribe(
        (result : any) => {
          Object.assign(this.user,result.persona)
          if (this.user != null && this.user.estado) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("username", this.user.nombreUsuario);
            sessionStorage.setItem("userid", this.user._id);
            sessionStorage.setItem("roles", JSON.stringify(this.user.roles));
            sessionStorage.setItem("area",JSON.stringify(this.user.area));
            //redirigimos a home o a pagina que llamo
            if (this.user.roles[0].nombre.toLowerCase() == "administrador"){
                this.router.navigate(['/Persona'])   
              }
              else if(this.user.roles[0].nombre.toLowerCase()  == "encargado"){
                this.router.navigate(['/Encargado'])  
              }
              else if (this.user.roles[0].nombre.toLowerCase()  == "autoridad"){
                this.router.navigate(['/Estadisticas'])  
              }
              else{
                this.router.navigate(['/MenuAnuncio']) 
              }
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
      error => {
        //usuario no encontrado muestro mensaje en la vista
        this.msglogin = "Credenciales incorrectas..";
      });
  }
}
