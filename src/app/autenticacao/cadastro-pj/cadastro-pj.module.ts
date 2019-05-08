import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroPjRoutingModule } from './cadastro-pj-routing.module';
import { CadastrarPjComponent } from './cadastrar-pj/cadastrar-pj.component';

@NgModule({
  declarations: [CadastrarPjComponent],
  imports: [
    CommonModule,
    CadastroPjRoutingModule
  ]
})
export class CadastroPjModule { }
