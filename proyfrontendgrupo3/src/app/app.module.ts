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
import { MenuAnunciosComponent } from './components/menu-anuncios/menu-anuncios.component';
import { FormAnunciosComponent } from './components/form-anuncios/form-anuncios.component';
import { EncargadoAnunciosComponent } from './components/encargado-anuncios/encargado-anuncios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxItemLegendModule,
  IgxPieChartModule,
  IgxLegendModule
} from 'igniteui-angular-charts';


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
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IgxItemLegendModule,// for legends of charts
    IgxLegendModule,// other legend for charts
    // modules for pie chart
    IgxPieChartModule, 
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
