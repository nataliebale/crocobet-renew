import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'crc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent {
  @Input() items: Array<any>;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() searchable = false;
  @Input() clearable = false;
  @Input() hideSelected = true;
  @Input() selected: number;
}
