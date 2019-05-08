import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CadastroPjRoutingModule } from './cadastro-pj-routing.module';
import { CadastrarPjComponent } from './cadastrar-pj/cadastrar-pj.component';
import { CadastroPjComponent } from './cadastro-pj.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CadastrarPjComponent, CadastroPjComponent],
  imports: [
    CommonModule,
    CadastroPjRoutingModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class CadastroPjModule { }
