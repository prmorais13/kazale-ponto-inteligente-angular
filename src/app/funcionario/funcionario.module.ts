import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuncionarioRoutingModule } from './';

import {
  ListagemComponent,
  LancamentoComponent,
  FuncionarioComponent
} from './components';
import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCardModule,
  MatPaginatorIntl
} from '@angular/material';

import { PtBrMatPaginatorIntlService } from '../shared/pt-br-mat-paginator-intl.service';

// import { FuncionarioComponent } from './components/funcionario.component';

@NgModule({
  declarations: [ListagemComponent, LancamentoComponent, FuncionarioComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,

    FuncionarioRoutingModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntlService }
  ]
})
export class FuncionarioModule {}
