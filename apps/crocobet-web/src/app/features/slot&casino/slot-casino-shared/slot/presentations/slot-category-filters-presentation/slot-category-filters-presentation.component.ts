import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-slot-category-filters-presentation',
  templateUrl: './slot-category-filters-presentation.component.html',
  styleUrls: ['./slot-category-filters-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCategoryFiltersPresentationComponent {
  @Input() filterItems: FilterItemView[];
  @Output() selectedChange = new EventEmitter<string>();

  showDropdown = false;
}
