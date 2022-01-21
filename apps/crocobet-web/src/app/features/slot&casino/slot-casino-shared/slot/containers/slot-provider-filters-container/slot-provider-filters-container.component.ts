import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FilterItemView } from '@crc/components';
import { SlotFilterTypeItem, SlotsFiltersFacade } from '@crc/facade';

@Component({
  selector: 'crc-w-slots-provider-filters-container',
  templateUrl: './slot-provider-filters-container.component.html',
  styleUrls: ['./slot-provider-filters-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class SlotProviderFiltersContainerComponent {
  filterItems$: Observable<FilterItemView[]>;

  constructor(private readonly facade: SlotsFiltersFacade) {
    this.filterItems$ = this.facade.getProviderFilterViewItems();
  }

  onSelectedProviderFilter(filter: string) {
    this.facade.selectFilter({
      filterType: 'provider',
      filter
    } as SlotFilterTypeItem);
  }
}
