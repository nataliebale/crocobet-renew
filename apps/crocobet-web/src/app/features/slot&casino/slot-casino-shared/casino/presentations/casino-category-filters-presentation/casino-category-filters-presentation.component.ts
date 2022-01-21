import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-casino-category-filters-presentation',
  templateUrl: './casino-category-filters-presentation.component.html',
  styleUrls: ['./casino-category-filters-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoCategoryFiltersPresentationComponent {
  @Input() filterItems: FilterItemView[];
  @Output() selectedChange = new EventEmitter<string>();

  showDropdown = false;
}
