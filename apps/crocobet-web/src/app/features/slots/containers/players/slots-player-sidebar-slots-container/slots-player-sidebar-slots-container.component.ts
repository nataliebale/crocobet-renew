import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { delay, from, merge, Observable, of, tap } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { FilterItemView } from '@crc/components';
import {
  FavoriteSlotGame,
  SlotFilterTypeItem,
  SlotGame,
  SlotsFavoriteFacade,
  SlotsFiltersFacade,
  SlotsPlayFacade
} from '@crc/facade';
import { replaceImage, slideInAndOut } from '@crc/shared';

import { SlotsPlayersSidebarInfo } from '../../../presentations/slots-player-sidebar-slots-presentation/slots-players-sidebar-info';

@Component({
  selector: 'crc-w-slots-player-sidebar-slots-container',
  templateUrl: './slots-player-sidebar-slots-container.component.html',
  styleUrls: ['./slots-player-sidebar-slots-container.component.scss'],
  animations: [slideInAndOut(300)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SlotsFiltersFacade]
})
export class SlotsPlayerSidebarSlotsContainerComponent {
  slots$: Observable<SlotsPlayersSidebarInfo[]>;
  filterItems$: Observable<FilterItemView[]>;
  activeFilterTitle: string;

  @Input() sidebarState: boolean;
  @Output() sidebarStateChanged = new EventEmitter<boolean>();

  constructor(
    private readonly slotsFiltersFacade: SlotsFiltersFacade,
    private readonly slotsPlayFacade: SlotsPlayFacade,
    private readonly slotsFavoriteFacade: SlotsFavoriteFacade
  ) {
    this.filterItems$ = this.slotsFiltersFacade
      .getSidebarCategoryFilters()
      .pipe(
        tap((filterItems) => {
          const activeFilters = filterItems.filter((f) => f.active);
          this.activeFilterTitle = activeFilters && activeFilters[0]?.name;
        })
      );
    this.slots$ = this.slotsFiltersFacade.filteredSlots$.pipe(
      switchMap((slots: SlotGame[]) =>
        from(slots).pipe(
          map((slotGame: SlotGame) => {
            return {
              ...replaceImage<SlotGame>('slot', slotGame.provider, slotGame),
              isFavorite: this.slotsFavoriteFacade.isSlotInFavorites(slotGame)
            } as SlotsPlayersSidebarInfo;
          }),
          toArray()
        )
      ),
      switchMap((items) => merge(of(null), of(items).pipe(delay(100))))
    );
  }

  onToggleSidebar() {
    this.sidebarStateChanged.emit(!this.sidebarState);
  }

  onSelectCategoryFilter(filter: string) {
    this.slotsFiltersFacade.selectFilter({
      filter,
      filterType: 'category'
    } as SlotFilterTypeItem);
  }

  onSlotGameClick(slotGame: FavoriteSlotGame) {
    this.slotsPlayFacade.play(slotGame);
  }

  onSlotFavoriteClick(slotGame: FavoriteSlotGame) {
    this.slotsFavoriteFacade.toggleFavorite(slotGame);
  }
}
