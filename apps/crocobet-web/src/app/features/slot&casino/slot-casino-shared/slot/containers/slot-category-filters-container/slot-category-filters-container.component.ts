import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

import { SlotFilterTypeItem, SlotsFiltersFacade } from '@crc/facade';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-slot-category-filters-container',
  templateUrl: './slot-category-filters-container.component.html',
  styleUrls: ['./slot-category-filters-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class SlotCategoryFiltersContainerComponent {
  filterItems$: Observable<FilterItemView[]>;

  constructor(private readonly facade: SlotsFiltersFacade) {
    this.filterItems$ = this.facade.getCategoryFilters();
  }

  onSelectCategoryFilter(filter: string) {
    this.facade.selectFilter({
      filter,
      filterType: filter === 'bonus' ? 'provider' : 'category'
    } as SlotFilterTypeItem);
  }
}
