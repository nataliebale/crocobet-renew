import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

import { CasinoFiltersFacade } from '@crc/facade';
import { FilterItemView } from '@crc/components';

@Component({
  selector: 'crc-w-casino-category-filters-container',
  templateUrl: './casino-category-filters-container.component.html',
  styleUrls: ['./casino-category-filters-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class CasinoCategoryFiltersContainerComponent {
  filterItems$: Observable<FilterItemView[]>;

  constructor(private readonly facade: CasinoFiltersFacade) {
    this.filterItems$ = this.facade.getGroupFilters();
  }

  onSelectCategoryFilter(filter: string) {
    this.facade.selectCategoryFilter(filter);
  }
}
