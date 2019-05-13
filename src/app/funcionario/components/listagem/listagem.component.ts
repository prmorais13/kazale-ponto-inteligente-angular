import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MatSnackBar,
  MatTableDataSource,
  PageEvent,
  MatPaginator,
  Sort,
  MatSort
} from '@angular/material';

import { LancamentoService } from '../../../shared/services/lancamento.service';

import { LancamentoModel } from '../../../shared/models/lancamento.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  dataSource: MatTableDataSource<LancamentoModel>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos().subscribe(
      data => {
        const lancamentos = data.data as LancamentoModel[];
        this.dataSource = new MatTableDataSource<LancamentoModel>(lancamentos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        const msg = 'Erro ao obeter lançamentos!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }
}
