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
  private readonly PATH_ULTIMO_LANC = 'funcionario/{funcionarioId}/ultimo';
  private readonly PATH_LANCAMENTOS = 'funcionario/{funcionarioId}';
  private readonly PATH_TODOS_LANC = 'funcionario/{funcionarioId}/todos';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  buscarUltimoLancamento(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/${(this.PATH_ULTIMO_LANC.replace(
        '{funcionarioId}',
        this.httpUtil.obterIdUsuario()
      ),
      this.httpUtil.obterIdUsuario())}`
    );
  }

  cadastrar(lancamento: LancamentoModel): Observable<any> {
    return this.http.post(
      `${environment.baseApiUrl}/${this.PATH}`,
      lancamento,
      this.httpUtil.headers()
    );
  }
}