import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material';

import { LancamentoService } from '../../../shared/services/lancamento.service';
import { Tipo } from '../../../shared/models/tipo.enum';
import { LancamentoModel } from '../../../shared/models/lancamento.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  form: FormGroup;
  horas: string[];
  minutos: string[];
  segundos: string[];
  tipos: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit() {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    this.tipos = [
      Tipo.INICIO_TRABALHO,
      Tipo.TERMINO_TRABALHO,
      Tipo.INICIO_ALMOCO,
      Tipo.TERMINO_ALMOCO
    ];
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

  cadastrar() {
    if (this.form.invalid) {
      return;
    }

    const dados = this.form.value;
    this.lancamentoService.cadastrar(this.obterLancamento(dados)).subscribe(
      data => {
        const msg = 'Lançamento cadastrado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/admin']);
      },
      err => {
        let msg = 'Erro ao cadastrar lancamento. Tente novamente!';
        if (err.status === 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
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
      '',
      this.funcionarioId
    );
  }

  get funcionarioId(): string {
    return sessionStorage.funcionarioId;
  }
}
