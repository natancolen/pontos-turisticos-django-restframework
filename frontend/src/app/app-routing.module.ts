import { PontosTuristicosRoutingModule } from './pontos-turisticos/pontos-turisticos-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./cadastro/cadastro.module').then((m) => m.CadastroModule),
  },
  {
    path: 'pontos-turisticos',
    loadChildren: () =>
      import('./pontos-turisticos/pontos-turisticos.module').then(
        (m) => m.PontosTuristicosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
