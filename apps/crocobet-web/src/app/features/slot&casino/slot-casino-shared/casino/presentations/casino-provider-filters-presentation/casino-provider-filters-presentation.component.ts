import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-casino-provider-filters-presentation',
  templateUrl: './casino-provider-filters-presentation.component.html',
  styleUrls: ['./casino-provider-filters-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoProviderFiltersPresentationComponent {
  @Input() filterItems: FilterItemView[];
  @Input() filterProviderItems: FilterItemView[];
  @Output() selectedChange = new EventEmitter<string>();

  showDropdown = false;
}
