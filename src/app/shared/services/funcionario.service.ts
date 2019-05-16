import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HttpUtilService } from './http-util.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly PATH = 'funcionarios';
  // private readonly PATH_FUNC_POR_EMPRESA = 'empresa/{empresaId}';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  listarFuncionariosPorEmpresa(): Observable<any> {
    const empresaId = this.httpUtil.obterIdEmpresa();
    return this.http.get(
      `${environment.baseApiUrl}/${this.PATH}/empresa/${empresaId}`,
      this.httpUtil.headers()
    );

    // return this.http.get(
    //   `${environment.baseApiUrl}/${this.PATH}/${this.PATH_FUNC_POR_EMPRESA.replace('{empresaId}', this.httpUtil.obterIdEmpresa())}`,
    //   this.httpUtil.headers()
    // );
  }
}
