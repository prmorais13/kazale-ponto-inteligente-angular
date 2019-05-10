import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FuncionarioComponent } from './components/funcionario.component';
// import { LancamentoComponent } from './components/lancamento/lancamento.component';
// import { ListagemComponent } from './components/listagem/listagem.component';
import {
  FuncionarioComponent,
  LancamentoComponent,
  ListagemComponent
} from './components';

const routes: Routes = [
  {
    path: 'funcionario',
    component: FuncionarioComponent,
    children: [
      {
        path: '',
        component: LancamentoComponent
      },
      {
        path: 'listagem',
        component: ListagemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule {}
