export class CadastroPjModel {
  constructor(
    public id: string,
    public nome: string,
    public email: string,
    public senha: string,
    public cpf: string,
    public razaoSocial: string,
    public cnpj: string
  ) {}
}
