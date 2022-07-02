import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './components/persona/persona.component';
import { HeaderComponent } from './components/layouds/header/header.component';
import { FooterComponent } from './components/layouds/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

import { LoginService } from './services/login.service';
import { AreaComponent } from './components/area/area.component';
import { MenuAnunciosComponent } from './components/menu-anuncios/menu-anuncios.component';
import { FormAnunciosComponent } from './components/form-anuncios/form-anuncios.component';
import { EncargadoAnunciosComponent } from './components/encargado-anuncios/encargado-anuncios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RecursosAnuncioComponent } from './components/recursos-anuncio/recursos-anuncio.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AreaComponent,
    MenuAnunciosComponent,
    FormAnunciosComponent,
    EncargadoAnunciosComponent,
    EstadisticasComponent,
    RecursosAnuncioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
