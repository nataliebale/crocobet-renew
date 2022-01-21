import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'crc-shared-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialInputComponent extends InputBaseComponent<string> {
  @Input() type: string;
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
