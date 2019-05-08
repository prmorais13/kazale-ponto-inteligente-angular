import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginModel } from './../models/login.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly PATH = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  logar(login: LoginModel): Observable<any> {
    return this.http.post(`${this.PATH}`, login);
  }
}
