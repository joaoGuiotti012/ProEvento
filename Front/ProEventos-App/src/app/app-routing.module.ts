import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './componentes/contatos/contatos.component';
import { HomeComponent } from './componentes/home/home.component';
import { PalestrantesComponent } from './componentes/palestrantes/palestrantes.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'evento',
    loadChildren: () => import('./componentes/eventos/eventos.module').then(m => m.EventosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'palestrante',
    loadChildren: () => import('./componentes/palestrantes/palestrantes.module').then( m => m.PalestrantesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contato',
    component: ContatosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/evento',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
