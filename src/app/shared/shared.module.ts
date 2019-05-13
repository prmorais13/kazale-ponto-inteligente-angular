import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascaraDirective } from './directives/mascara.directive';
import { TipoPipe } from './pipes/tipo.pipe';

// import { PtBrMatPaginatorIntlService } from './pt-br-mat-paginator-intl.service';

@NgModule({
  declarations: [MascaraDirective, TipoPipe],
  imports: [CommonModule],
  exports: [MascaraDirective, TipoPipe] // ,
  // providers: [PtBrMatPaginatorIntlService]
})
export class SharedModule {}
