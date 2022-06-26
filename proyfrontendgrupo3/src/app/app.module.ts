import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './components/persona/persona.component';
import { HeaderComponent } from './components/layouds/header/header.component';
import { FooterComponent } from './components/layouds/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

import { LoginService } from './services/login.service';
import { AreaComponent } from './components/area/area.component';
import { RolComponent } from './components/rol/rol.component';
import { MenuAnunciosComponent } from './components/menu-anuncios/menu-anuncios.component';
import { FormAnunciosComponent } from './components/form-anuncios/form-anuncios.component';
import { EncargadoAnunciosComponent } from './components/encargado-anuncios/encargado-anuncios.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AreaComponent,
    RolComponent,
    MenuAnunciosComponent,
    FormAnunciosComponent,
    EncargadoAnunciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
