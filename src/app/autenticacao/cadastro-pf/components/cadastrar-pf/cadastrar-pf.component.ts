import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { CadastroPfModel } from '../../models/cadastro-pf.model';

import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';

@Component({
  selector: 'app-cadastrar-pf',
  templateUrl: './cadastrar-pf.component.html',
  styleUrls: ['./cadastrar-pf.component.scss']
})
export class CadastrarPfComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
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
      cnpj: ['', [Validators.required, CnpjValidator]]
    });
  }

  cadastrarPf() {
    if (this.form.invalid) {
      return;
    }

    const cadastroPf: CadastroPfModel = this.form.value;
    console.log(JSON.stringify(cadastroPf));
    // this.cadastroService.cadastrar(cadastroPj).subscribe(
    //   data => {
    //     console.log(JSON.stringify(data));.moe
    //     const msg = 'Realize o login para acessar o sistema!';
    //     this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
    //     this.router.navigate(['/login']);
    //   },
    //   error => {
    //     console.log(JSON.stringify(error));
    //     let msg = 'Tente novamente em instantes!';

    //     if (error.status === 400) {
    //       msg = error.error.errors.join(' ');
    //     }
    //     this.snackBar.open(msg, 'Erro', { duration: 5000 });
    //   }
    // );
    return false;
  }
}
