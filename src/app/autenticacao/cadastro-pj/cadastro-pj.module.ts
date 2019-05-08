import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';

import { CadastroPjRoutingModule } from './cadastro-pj-routing.module';
import { CadastrarPjComponent } from './cadastrar-pj/cadastrar-pj.component';
import { CadastroPjComponent } from './cadastro-pj.component';

@NgModule({
  declarations: [CadastrarPjComponent, CadastroPjComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    FlexLayoutModule,
    CadastroPjRoutingModule
  ]
})
export class CadastroPjModule {}
