import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutingModule } from './';

import {
  ListagemComponent,
  CadastroComponent,
  AtualizacaoComponent,
  AdminComponent
} from './components';
// import { AdminComponent } from './components/admin.component';
// import { CadastroComponent } from './components/cadastro/cadastro.component';
// import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent
  ],
  imports: [CommonModule, FlexLayoutModule, AdminRoutingModule]
})
export class AdminModule {}
