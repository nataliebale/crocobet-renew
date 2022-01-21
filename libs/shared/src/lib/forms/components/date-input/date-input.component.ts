import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'crc-shared-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent extends InputBaseComponent<Date> {
  @Input() min?: Date;
  @Input() max?: Date;

  writeValue(value: Date) {
    this.value = value;
  }
}
