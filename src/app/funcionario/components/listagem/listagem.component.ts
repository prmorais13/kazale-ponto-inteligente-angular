import { Component, OnInit } from '@angular/core';

import { MatSnackBar, MatTableDataSource } from '@angular/material';

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

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos().subscribe(
      data => {
        const lancamentos = data.data as LancamentoModel[];
        this.dataSource = new MatTableDataSource<LancamentoModel>(lancamentos);
      },
      err => {
        const msg = 'Erro ao obeter lançamentos!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }
}
