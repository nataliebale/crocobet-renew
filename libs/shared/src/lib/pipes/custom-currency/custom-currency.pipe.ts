import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: string): string | undefined {
    return value === 'GEL' ? '₾' : undefined;
  }
}
