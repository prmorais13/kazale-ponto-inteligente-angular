import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuncionarioRoutingModule } from './';

import {
  ListagemComponent,
  LancamentoComponent,
  FuncionarioComponent
} from './components';

// import { FuncionarioComponent } from './components/funcionario.component';

@NgModule({
  declarations: [ListagemComponent, LancamentoComponent, FuncionarioComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule {}
