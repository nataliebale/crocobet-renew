import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-slot-provider-filters-presentation',
  templateUrl: './slot-provider-filters-presentation.component.html',
  styleUrls: ['./slot-provider-filters-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotProviderFiltersPresentationComponent {
  @Input() filterItems: FilterItemView[];
  @Input() filterProviderItems: FilterItemView[];
  @Output() selectedChange = new EventEmitter<string>();

  showDropdown = false;
}
