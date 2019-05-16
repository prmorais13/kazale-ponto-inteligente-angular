import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatTableDataSource,
  MatSnackBar,
  Sort,
  PageEvent
} from '@angular/material';

import { HttpUtilService } from '../../../shared/services/http-util.service';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
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
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService
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
    this.funcionarioId = '2';

    this.lancamentoService
      .listarLancamentosPorFuncionario(
        this.funcionarioId,
        this.pagina,
        this.ordem,
        this.direcao
      )
      .subscribe(
        data => {
          this.totalLancamentos = data.data.totalElements;
          const lancamentos = data.data.content as LancamentoModel[];
          this.dataSource = new MatTableDataSource<LancamentoModel>(
            lancamentos
          );
        },
        err => {
          const msg = 'Erro obtendo lançamentos!';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        }
      );
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction === '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }
}
