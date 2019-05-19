import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

import { HttpUtilService } from './http-util.service';

import { LancamentoModel } from '../models/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private readonly PATH = 'lancamentos';
  private readonly PATH_ULTIMO_LANC = `funcionario/${this.httpUtil.obterIdUsuario()}/ultimo`;
  private readonly PATH_LANCAMENTOS = 'funcionario';
  private readonly PATH_TODOS_LANC = `funcionario/${this.httpUtil.obterIdUsuario()}/todos`;

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  buscarUltimoLancamento(): Observable<any> {
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/${this.PATH_ULTIMO_LANC}`,
      this.httpUtil.headers()
    );
  }

  cadastrar(lancamento: LancamentoModel): Observable<any> {
    return this.http.post(
      `${environment.baseApiUrl}/${this.PATH}`,
      lancamento,
      this.httpUtil.headers()
    );
  }

  listarTodosLancamentos(): Observable<any> {
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/${this.PATH_TODOS_LANC}`,
      this.httpUtil.headers()
    );
  }

  listarLancamentosPorFuncionario(
    funcionarioId: string,
    pagina: number,
    ordem: string,
    direcao: string
  ): Observable<any> {
    const params = `?pag=${pagina}&ord=${ordem}&dir=${direcao}`;
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/${
        this.PATH_LANCAMENTOS
      }/${funcionarioId}${params}`,
      this.httpUtil.headers()
    );
  }

  remover(lancamentoId: string): Observable<any> {
    return this.http.delete(
      `${environment.baseApiUrl}/${this.PATH}/${lancamentoId}`,
      this.httpUtil.headers()
    );
  }

  buscarPorId(lancamentoId: string): Observable<any> {
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/${lancamentoId}`,
      this.httpUtil.headers()
    );
  }

  atualizar(lancamento: LancamentoModel): Observable<any> {
    return this.http.put(
      `${environment.baseApiUrl}/${this.PATH}/${lancamento.id}`,
      lancamento,
      this.httpUtil.headers()
    );
  }
}
