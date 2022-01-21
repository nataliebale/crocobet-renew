import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FilterItemView } from '@crc/components';
import { CasinoFiltersFacade, CasinoFilterTypeItem } from '@crc/facade';

@Component({
  selector: 'crc-w-casino-provider-filters-container',
  templateUrl: './casino-provider-filters-container.component.html',
  styleUrls: ['./casino-provider-filters-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class CasinoProviderFiltersContainerComponent {
  filterItems$: Observable<FilterItemView[]>;

  constructor(private readonly facade: CasinoFiltersFacade) {
    this.filterItems$ = this.facade.getProviderFilterViewItems();
  }

  onSelectedProviderFilter(filter: string) {
    this.facade.selectProviderFilter(filter);
  }
}
