import { LancamentoModel } from './lancamento.model';

export class Funcionario {
  constructor(
    public nome: string,
    public email: string,
    public cpf: string,
    public perfil: string,
    public valorHora?: string,
    public qtHorasTrabalhoDia?: string,
    public qtHorasAlmoco?: string,
    public lancamentos?: LancamentoModel[],
    public id?: string
  ) {}
}
