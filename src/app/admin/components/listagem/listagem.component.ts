import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

import { HttpUtilService } from '../../../shared/services/http-util.service';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { LancamentoModel } from '../../../shared/models/lancamento.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss']
})
export class ListagemComponent implements OnInit {
  dataSource: MatTableDataSource<LancamentoModel>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.exibirLancamentos();
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  exibirLancamentos() {
    throw new Error('Method not implemented.');
  }
}
