import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascaraDirective } from './directives/mascara.directive';

// import { PtBrMatPaginatorIntlService } from './pt-br-mat-paginator-intl.service';

@NgModule({
  declarations: [MascaraDirective],
  imports: [CommonModule],
  exports: [MascaraDirective] // ,
  // providers: [PtBrMatPaginatorIntlService]
})
export class SharedModule {}
