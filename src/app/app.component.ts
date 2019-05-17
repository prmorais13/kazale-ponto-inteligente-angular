import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ponto-inteligente';

  constructor(private router: Router) {}

  sair() {
    delete localStorage.token;
    delete sessionStorage.funcionarioId;
    this.router.navigate(['/']);
  }

  autenticado(): boolean {
    return localStorage.token;
  }
}
