import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { MatSnackBar } from '@angular/material';

import { Tipo } from './../../../shared/models/tipo.enum';

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

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
    this.obterGeoLocation();
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
    alert(
      `Tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn}, geolocarion: ${
        this.geoLocation
      }`
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
    this.ultimoTipoLancado = Tipo.INICIO_TRABALHO;
  }
}
