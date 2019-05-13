import { Pipe, PipeTransform } from '@angular/core';
import { Tipo } from '../models/tipo.enum';

@Pipe({
  name: 'tipoDesc'
})
export class TipoPipe implements PipeTransform {
  transform(tipo: Tipo, args?: any): string {
    return this.obterTexto(tipo);
  }

  obterTexto(tipo: Tipo): string {
    let tipoDesc: string;

    switch (tipo) {
      case 'INICIO_TRABALHO':
        tipoDesc = 'Início do trabalho';
        break;
      case 'INICIO_ALMOCO':
        tipoDesc = 'Início do almoço';
        break;
      case 'TERMINO_ALMOCO':
        tipoDesc = 'Término do almoço';
        break;
      case 'TERMINO_TRABALHO':
        tipoDesc = 'Término do trabalho';
        break;
      default:
        tipoDesc = tipo;
        break;
    }
    return tipoDesc;
  }
}
