import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonaComponent } from './components/persona/persona.component';
import { AreaComponent } from './components/area/area.component';
import { LoginComponent } from './components/login/login.component';
import { MenuAnunciosComponent } from './components/menu-anuncios/menu-anuncios.component';
import { FormAnunciosComponent } from './components/form-anuncios/form-anuncios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { RecursosAnuncioComponent } from './components/recursos-anuncio/recursos-anuncio.component';
import { EncargadoAnunciosComponent } from './components/encargado-anuncios/encargado-anuncios.component';

const routes: Routes = [
  {path: 'Area', component:AreaComponent},
  {path: 'Persona', component:PersonaComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'FormAnuncio', component:FormAnunciosComponent},
  {path: 'MenuAnuncio', component:MenuAnunciosComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'recursos/:id', component: RecursosAnuncioComponent},
  {path: 'Encargado', component: EncargadoAnunciosComponent},
  {path: '**', pathMatch:'full', redirectTo:'Login'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
