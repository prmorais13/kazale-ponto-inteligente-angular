import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CadastroPfModel } from '../models/cadastro-pf.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroPfService {
  private readonly PATH = `${environment.baseApiUrl}/cadastrar-pf`;

  constructor(private http: HttpClient) {}

  cadastrar(cadastroPf: CadastroPfModel): Observable<any> {
    return this.http.post(this.PATH, cadastroPf);
  }
}
