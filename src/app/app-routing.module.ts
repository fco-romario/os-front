import { ClienteReadComponent } from './views/components/cliente/cliente-read/cliente-read.component';
import { TecnicoDeleteComponent } from './views/components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from './views/components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoCreateComponent } from './views/components/tecnico/tecnico-create/tecnico-create.component';
import { HomeComponent } from './views/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TecnicoReadComponent } from './views/components/tecnico/tecnico-read/tecnico-read.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'tecnicos', component: TecnicoReadComponent},
  {path:'tecnicos/create', component: TecnicoCreateComponent},
  {path:'tecnicos/update/:id', component: TecnicoUpdateComponent},
  {path:'tecnicos/delete/:id', component: TecnicoDeleteComponent},

  {path:'clientes', component: ClienteReadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
