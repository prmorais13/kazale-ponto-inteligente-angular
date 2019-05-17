import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatTableDataSource,
  MatSnackBar,
  Sort,
  PageEvent,
  MatSelect
} from '@angular/material';

import { HttpUtilService } from '../../../shared/services/http-util.service';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';

import { FuncionarioModel } from '../../../shared/models/funcionario.model';
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

  funcionarios: FuncionarioModel[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

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
    // this.exibirLancamentos();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage.funcionarioId || false;
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa().subscribe(
      data => {
        const usuarioId: string = this.httpUtil.obterIdUsuario();
        this.funcionarios = (data.data as FuncionarioModel[]).filter(
          func => func.id !== usuarioId
        );

        if (this.funcId) {
          this.form.get('funcs').setValue(parseInt(this.funcId, 10));
          this.exibirLancamentos();
        }
      },
      err => {
        const msg = 'Erro obtendo funcionários!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }

  exibirLancamentos() {
    // this.funcionarioId = '2';
    if (this.matSelect.selected) {
      this.funcionarioId = this.matSelect.value;
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    console.log(this.funcionarioId);
    sessionStorage.funcionarioId = this.funcionarioId;

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
