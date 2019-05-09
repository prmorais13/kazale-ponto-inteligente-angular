import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CadastroPjModel } from '../models/cadastro-pj.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroPjService {
  private readonly PATH = `${environment.baseApiUrl}/cadastrar-pj`;

  constructor(private http: HttpClient) {}

  cadastrar(cadastroPj: CadastroPjModel): Observable<any> {
    return this.http.post(this.PATH, cadastroPj);
  }
}
