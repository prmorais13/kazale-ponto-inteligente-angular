import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatTooltipModule,
  MatIconModule,
  MatSnackBarModule,
  MatTableModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSortModule,
  MAT_DATE_LOCALE
} from '@angular/material';

import { AdminRoutingModule } from './';
import { SharedModule } from '../shared/shared.module';
import { PtBrMatPaginatorIntlService } from '../shared/pt-br-mat-paginator-intl.service';

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,

    AdminRoutingModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt_BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntlService }
  ]
})
export class AdminModule {}
