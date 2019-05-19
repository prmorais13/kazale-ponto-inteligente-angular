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

import { AdminGuard } from './guards/admin.guard';
import {
  ListagemComponent,
  CadastroComponent,
  AtualizacaoComponent,
  AdminComponent,
  ConfirmaDialogComponent
} from './components';
// import { AdminComponent } from './components/admin.component';
// import { CadastroComponent } from './components/cadastro/cadastro.component';
// import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';

@NgModule({
  declarations: [
    ListagemComponent,
    CadastroComponent,
    AtualizacaoComponent,
    AdminComponent,
    ConfirmaDialogComponent
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
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntlService },
    AdminGuard
  ],
  entryComponents: [ConfirmaDialogComponent]
})
export class AdminModule {}
