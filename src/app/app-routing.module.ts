import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AjoutAnnonceComponent } from './ajout-annonce/ajout-annonce.component';

const routes: Routes = [
  {
    path: 'login/:isLogon',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'ajout',
    component: AjoutAnnonceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
