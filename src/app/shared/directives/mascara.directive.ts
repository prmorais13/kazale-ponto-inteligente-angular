import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mascara]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MascaraDirective,
      multi: true
    }
  ]
})
export class MascaraDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;

  @Input() mascara: string;

  constructor(private el: ElementRef) {}

  writeValue(value: any) {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onkeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, '');

    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    const pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onblur($event: any) {
    if ($event.target.value.length === this.mascara.length) {
      return;
    }

    this.onChange('');
    $event.target.value = '';
  }

  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    const pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i), 0))) {
        valor += this.mascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
