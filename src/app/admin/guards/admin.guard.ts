import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { HttpUtilService } from '../../shared/services/http-util.service';

@Injectable()
// {providedIn: 'root'}
export class AdminGuard implements CanActivate {
  constructor(
    private httUtilService: HttpUtilService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.httUtilService.obterPerfil() === 'ROLE_ADMIN') {
      return true;
    }
    this.router.navigate(['/funcionario']);
    return false;
  }
}
