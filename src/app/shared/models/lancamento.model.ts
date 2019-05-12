export class LancamentoModel {
  constructor(
    public data: string,
    public tipo: string,
    public localizacao: string,
    public funcionarioId: string,
    public id?: string
  ) {}
}
