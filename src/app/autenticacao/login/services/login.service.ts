import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginModel } from './../models/login.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly PATH = 'auth';

  constructor(private http: HttpClient) {}

  logar(login: LoginModel): Observable<any> {
    return this.http.post(`${environment.baseUrl}/${this.PATH}`, login);
  }
}
