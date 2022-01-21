import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FilterItemView } from '@crc/components';
import { EnvironmentService } from '@crc/shared';

import { SLOTS_CATEGORY_FILTER_ITEMS } from '../constants/slot-category-filter-items';
import { SlotFilterTypeItem, SlotGame } from '../entity';
import { SlotsService } from '../services/slots.service';
import { SlotsFacade } from './slots.facade';
import { Provider } from '../../shared';
import { DEFAULT_SLOT_CATEGORY_FILTER_TYPE_ITEM } from '../constants/default-slot-category-filter';
import { SlotsFavoriteFacade } from './slots-favorite.facade';
import { SLOTS_CATEGORY_SIDEBAR_FILTER_ITEMS } from '../constants/slot-category-sidebar-filter-items';
import { SlotsHistoryFacade } from './slots-history.facade';

@Injectable({
  providedIn: 'root'
})
export class SlotsFiltersFacade {
  private readonly $activeFilter = new BehaviorSubject<SlotFilterTypeItem>(
    DEFAULT_SLOT_CATEGORY_FILTER_TYPE_ITEM
  );
  readonly activeFilter$ = this.$activeFilter.asObservable();
  readonly filteredSlots$: Observable<SlotGame[]>;

  constructor(
    private readonly slotsService: SlotsService,
    private readonly slotsFacade: SlotsFacade,
    private readonly slotsFavoriteFacade: SlotsFavoriteFacade,
    private readonly slotsHistoryFacade: SlotsHistoryFacade
  ) {
    this.activeFilter$
      .pipe(
        switchMap((filterTypeItem) =>
          this.slotsFavoriteFacade.favoriteTrigger$.pipe(
            tap((_) => {
              if (filterTypeItem.filter === 'slot:favorites') {
                this.selectFilter({
                  filter: 'slot:favorites',
                  filterType: 'category'
                });
              }
            })
          )
        )
      )
      .subscribe();

    this.activeFilter$
      .pipe(
        switchMap((filterTypeItem) =>
          this.slotsHistoryFacade.historyTrigger$.pipe(
            tap((_) => {
              if (filterTypeItem.filter === 'slot:history') {
                this.selectFilter({
                  filter: 'slot:history',
                  filterType: 'category'
                });
              }
            })
          )
        )
      )
      .subscribe();

    this.filteredSlots$ = this.activeFilter$.pipe(
      switchMap((filterItem: SlotFilterTypeItem) => {
        return filterItem.filterType === 'category'
          ? filterItem.filter === 'slot:favorites'
            ? of(this.slotsFavoriteFacade.getFavoriteSlots())
            : filterItem.filter === 'slot:history'
            ? of(this.slotsHistoryFacade.getSlotsHistory())
            : this.slotsFacade.getSlotsByCategory(filterItem.filter)
          : this.slotsFacade.getSlotsByProvider(filterItem.filter);
      }),
      map((items) => items ?? [])
    );
  }

  selectFilter(filterTypeItem: SlotFilterTypeItem) {
    this.$activeFilter.next(filterTypeItem);
  }

  resetFilter() {
    this.selectFilter(DEFAULT_SLOT_CATEGORY_FILTER_TYPE_ITEM);
  }

  getCategoryFilters(): Observable<FilterItemView[]> {
    return of(SLOTS_CATEGORY_FILTER_ITEMS).pipe(
      switchMap((items: FilterItemView[]) =>
        this.activeFilter$.pipe(
          map((active) => {
            return items.map((item: FilterItemView) => {
              return {
                ...item,
                active:
                  (active.filterType === 'category' ||
                    (active.filterType === 'provider' &&
                      item.filter === 'bonus')) &&
                  item.filter === active.filter
              } as FilterItemView;
            });
          })
        )
      )
    );
  }

  getSidebarCategoryFilters(): Observable<FilterItemView[]> {
    return of(SLOTS_CATEGORY_SIDEBAR_FILTER_ITEMS).pipe(
      switchMap((items: FilterItemView[]) =>
        this.activeFilter$.pipe(
          map((active) => {
            return items.map((item: FilterItemView) => {
              return {
                ...item,
                active: item.filter === active.filter
              } as FilterItemView;
            });
          })
        )
      )
    );
  }

  getProviderFilterViewItems() {
    return this.slotsFacade.providers$.pipe(
      map((items) => {
        return items
          .filter((i) => i.enabled && i.gamesCount)
          .map((item: Provider) => {
            return {
              name: item.name,
              filter: item.provider,
              isNew: item.tags?.includes('new')
            } as FilterItemView;
          });
      }),
      switchMap((items: FilterItemView[]) =>
        this.activeFilter$.pipe(
          map((active) => {
            return items.map((item: FilterItemView) => {
              return {
                ...item,
                active:
                  active.filterType === 'provider' &&
                  item.filter === active.filter
              } as FilterItemView;
            });
          })
        )
      )
    );
  }
}
