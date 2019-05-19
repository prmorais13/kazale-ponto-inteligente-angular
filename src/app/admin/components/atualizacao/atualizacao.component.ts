import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material';

import { LancamentoService } from '../../../shared/services/lancamento.service';

import { Tipo } from '../../../shared/models/tipo.enum';
import { LancamentoModel } from '../../../shared/models/lancamento.model';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.scss']
})
export class AtualizacaoComponent implements OnInit {
  form: FormGroup;
  horas: string[];
  minutos: string[];
  tipos: string[];

  lancamentoId: string;
  localizacao: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit() {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId');
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.TERMINO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO
    ];
    this.gerarForm();
    this.obterDadosLancamento();
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = Array();

    for (let i = inicio; i <= termino; i++) {
      let numero = i.toString();
      if (i < 10) {
        numero = '0' + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  atualizar() {
    if (this.form.invalid) {
      return;
    }

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados)).subscribe(
      data => {
        const msg = 'Lançamento atualizado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/admin']);
      },
      err => {
        let msg = 'Erro ao atualizar lancamento. Tente novamente!';
        if (err.status === 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId).subscribe(
      dados => {
        const { data, tipo, localizacao } = dados.data;
        this.form.get('data').setValue(data.substr(0, 10));
        this.form.get('horas').setValue(data.substr(11, 2));
        this.form.get('minutos').setValue(data.substr(14, 2));
        this.form.get('tipo').setValue(tipo);
        this.localizacao = localizacao;
      },
      err => {
        const msg = 'Erro obtendo lançamento!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
        this.router.navigate(['/admin']);
      }
    );
  }

  obterLancamento(dados: any): LancamentoModel {
    const { horas, minutos, tipo, data } = dados;
    const dataRef = moment(data);

    dataRef.set({
      hour: horas,
      minute: minutos,
      second: 0
    });

    return new LancamentoModel(
      dataRef.format('YYYY-MM-DD HH:mm:ss'),
      tipo,
      this.localizacao,
      this.funcionarioId,
      this.lancamentoId
    );
  }

  get funcionarioId(): string {
    return sessionStorage.funcionarioId;
  }
}
