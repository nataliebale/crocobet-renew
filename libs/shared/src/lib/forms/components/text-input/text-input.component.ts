import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InputBaseComponent } from '../input-base/input-base.component';
import { TextBoxControlType } from '../../types';

@Component({
  selector: 'crc-shared-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputComponent extends InputBaseComponent<string> {
  @Input() type: TextBoxControlType;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() placeholder: string;
  @Input() mask: string;
  @Input() showToggleHideTextIcon: boolean;

  typeToggled: boolean;

  onToggleHideText() {
    if (this.type === 'password') {
      this.typeToggled = !this.typeToggled;
    }
  }
}
