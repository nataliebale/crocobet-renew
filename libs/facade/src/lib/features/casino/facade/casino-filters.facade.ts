import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  Observable,
  switchMap
} from 'rxjs';
import { map, take } from 'rxjs/operators';

import { FilterItemView } from '@crc/components';

import { Provider } from '../../shared';
import { CasinoService } from '../services/casino.service';
import { DEFAULT_CASINO_PROVIDER_FILTER } from '../constants/default-casino-provider-filter';
import { CasinoFacade } from './casino.facade';
import { CasinoGame } from '../entity';
import { CASINO_ALL_PROVIDER_FILTER_ITEM } from '../constants/all-provider-filter-item';
import { CASINO_GROUPS } from '../constants/casino-group-filter-items';
import { DEFAULT_CASINO_GROUP_FILTER_TYPE_ITEM } from '../constants/default-casino-group-filter';
import { CASINO_ALL_GROUP_FILTER_ITEM } from '../constants/all-group-filter-item';

@Injectable({
  providedIn: 'root'
})
export class CasinoFiltersFacade {
  private readonly $activeGroupFilter = new BehaviorSubject<string>(
    DEFAULT_CASINO_GROUP_FILTER_TYPE_ITEM
  );
  private readonly $activeProviderFilter = new BehaviorSubject<string>(
    DEFAULT_CASINO_PROVIDER_FILTER
  );
  readonly activeGroupFilter$ = this.$activeGroupFilter
    .asObservable()
    .pipe(distinctUntilChanged());
  readonly activeProviderFilter$ = this.$activeProviderFilter
    .asObservable()
    .pipe(distinctUntilChanged());
  readonly filteredCasinos$: Observable<CasinoGame[]>;

  constructor(
    private readonly casinoService: CasinoService,
    private readonly casinoFacade: CasinoFacade
  ) {
    this.filteredCasinos$ = this.activeGroupFilter$.pipe(
      switchMap((group) =>
        this.activeProviderFilter$.pipe(
          switchMap((provider) => {
            return this.casinoFacade.allCasinos$.pipe(
              map((casinos) => {
                let filteredCasinos: CasinoGame[] = [...casinos];
                if (group) {
                  // TODO duplicated logic
                  if (CASINO_GROUPS.includes(group)) {
                    filteredCasinos = filteredCasinos.filter((g) =>
                      g.group_name?.includes(group)
                    );
                  } else {
                    filteredCasinos = filteredCasinos.filter((g) => {
                      return !CASINO_GROUPS.reduce((res, cur) => {
                        return res || g.group_name?.includes(cur);
                      }, false);
                    });
                  }
                }

                if (provider) {
                  filteredCasinos = filteredCasinos.filter(
                    (p) => p.provider === provider
                  );
                }

                return filteredCasinos;
              })
            );
          }),
          map((items) => items ?? [])
        )
      )
    );
  }

  selectCategoryFilter(filter: string) {
    this.selectProviderFilter('');
    this.$activeGroupFilter.next(filter);
  }

  selectProviderFilter(filter: string) {
    this.$activeProviderFilter.next(filter);
  }

  resetFilter() {
    this.$activeProviderFilter.next(DEFAULT_CASINO_PROVIDER_FILTER);
    this.$activeGroupFilter.next(DEFAULT_CASINO_GROUP_FILTER_TYPE_ITEM);
  }

  getGroupFilters(): Observable<FilterItemView[]> {
    return this.casinoFacade.groups$.pipe(
      map((items) => [CASINO_ALL_GROUP_FILTER_ITEM, ...items]),
      switchMap((items: FilterItemView[]) =>
        this.activeGroupFilter$.pipe(
          map((filter) => {
            return items.map((item: FilterItemView) => {
              return {
                ...item,
                active: item.filter === filter
              } as FilterItemView;
            });
          })
        )
      )
    );
  }

  getProviderFilterViewItems(): Observable<FilterItemView[]> {
    return this.activeGroupFilter$.pipe(
      switchMap((_) =>
        this.casinoFacade.providers$.pipe(
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
          // remove providers without games in selected group
          switchMap((providers) =>
            combineLatest([
              this.filteredCasinos$,
              this.activeProviderFilter$
            ]).pipe(
              take(1),
              map(([casinos, activeProvider]) => {
                return activeProvider
                  ? providers
                  : providers.filter((p) =>
                      casinos.find((c) => c.provider === p.filter)
                    );
              })
            )
          ),
          map((items) => [CASINO_ALL_PROVIDER_FILTER_ITEM, ...items]),
          switchMap((items: FilterItemView[]) =>
            this.activeProviderFilter$.pipe(
              map((filter) => {
                return items.map((item: FilterItemView) => {
                  return {
                    ...item,
                    active: item.filter === filter
                  } as FilterItemView;
                });
              })
            )
          )
        )
      )
    );
  }
}
