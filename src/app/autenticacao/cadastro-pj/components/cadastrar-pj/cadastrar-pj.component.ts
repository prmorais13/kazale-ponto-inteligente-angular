import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { CadastroPjService } from '../../services/cadastro-pj.service';
import { CadastroPjModel } from '../../models/cadastro-pj.model';

import { CpfValidator } from '../../../../shared/validators/cpf.validator';
import { CnpjValidator } from '../../../../shared/validators/cnpj.validator';

@Component({
  selector: 'app-cadastrar-pj',
  templateUrl: './cadastrar-pj.component.html',
  styleUrls: ['./cadastrar-pj.component.scss'],
  preserveWhitespaces: true
})
export class CadastrarPjComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastroService: CadastroPjService
  ) {}

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, CpfValidator]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrarPj() {
    if (this.form.invalid) {
      return;
    }

    const cadastroPj: CadastroPjModel = this.form.value;
    this.cadastroService.cadastrar(cadastroPj).subscribe(
      data => {
        console.log(JSON.stringify(data));
        const msg = 'Realize o login para acessar o sistema!';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error => {
        console.log(JSON.stringify(error));
        let msg = 'Tente novamente em instantes!';

        if (error.status === 400) {
          msg = error.error.errors.join(' ');
        }
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      }
    );
    return false;
  }
}
