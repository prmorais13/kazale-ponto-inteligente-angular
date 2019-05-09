import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPfComponent } from './components/cadastro-pf.component';
import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';

const routes: Routes = [
  {
    path: 'cadastro-pf',
    component: CadastroPfComponent,
    children: [
      {
        path: '',
        component: CadastrarPfComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroPfRoutingModule {}
