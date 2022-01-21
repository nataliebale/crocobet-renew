import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CurrencyCode } from '../../../types';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'crc-shared-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumericInputComponent extends InputBaseComponent<number> {
  @Input() min?: number;
  @Input() max?: number;
  @Input() currency?: CurrencyCode;

  writeValue(value: number) {
    this.value = value;
  }
}
