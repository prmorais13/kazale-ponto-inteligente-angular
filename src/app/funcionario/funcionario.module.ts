import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';

import { ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';

@NgModule({
  declarations: [ListagemComponent, LancamentoComponent],
  imports: [CommonModule, FuncionarioRoutingModule]
})
export class FuncionarioModule {}
