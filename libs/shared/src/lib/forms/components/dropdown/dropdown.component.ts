import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DropdownItem } from '../../entity';
import { InputBaseComponent } from '../input-base/input-base.component';
import { DropdownValue } from '../../types';

@Component({
  selector: 'crc-shared-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent extends InputBaseComponent<DropdownValue> {
  @Input() data: DropdownItem[];
}
