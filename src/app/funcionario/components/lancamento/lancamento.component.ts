import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material';

import { HttpUtilService } from './../../../shared/services/http-util.service';
import { LancamentoService } from './../../../shared/services/lancamento.service';

import { LancamentoModel } from '../../../shared/models/lancamento.model';
import { Tipo } from '../../../shared/models/tipo.enum';

declare var navigator: any;

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {
  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private httpUtil: HttpUtilService,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit() {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position =>
          (this.geoLocation = `
        ${position.coords.latitude},${position.coords.longitude} `)
      );
      return '';
    }
  }

  iniciarTrabalho() {
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO);
  }

  cadastrar(tipo: Tipo) {
    const lancamento: LancamentoModel = new LancamentoModel(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httpUtil.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento).subscribe(
      data => {
        const msg = 'Lançamento cadastrado com sucesso!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/funcionario/listagem']);
      },
      error => {
        let msg = 'Tente novamente em instantes!';
        if (error.status === 400) {
          msg = error.error.errors.join(' ');
        }

        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }

  obterUrlMapa(): string {
    return `https://www.google.com/maps/search/?api=1&query=´${
      this.geoLocation
    }`;
  }

  exibirInicioTrabalho(): boolean {
    return (
      this.ultimoTipoLancado === '' ||
      this.ultimoTipoLancado === Tipo.TERMINO_TRABALHO
    );
  }

  exibirTerminoTrabalho(): boolean {
    return (
      this.ultimoTipoLancado === Tipo.INICIO_TRABALHO ||
      this.ultimoTipoLancado === Tipo.TERMINO_ALMOCO
    );
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_TRABALHO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado === Tipo.INICIO_ALMOCO;
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoLancamento().subscribe(
      data => {
        this.ultimoTipoLancado = data.data ? data.data.tipo : '';
      },
      error => {
        const msg = 'Erro obtendo último lançamento!';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
  }
}
