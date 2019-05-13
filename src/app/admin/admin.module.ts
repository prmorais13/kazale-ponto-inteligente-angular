import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './';
import {
  ListagemComponent,
  CadastroComponent,
  AtualizacaoComponent
} from './components';
// import { CadastroComponent } from './components/cadastro/cadastro.component';
// import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';

@NgModule({
  declarations: [ListagemComponent, CadastroComponent, AtualizacaoComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
