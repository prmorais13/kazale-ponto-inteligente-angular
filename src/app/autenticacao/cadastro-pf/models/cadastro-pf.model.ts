export class CadastroPfModel {
  constructor(
    public id: string,
    public nome: string,
    public email: string,
    public senha: string,
    public cpf: string,
    public cnpj: string
  ) {}
}
