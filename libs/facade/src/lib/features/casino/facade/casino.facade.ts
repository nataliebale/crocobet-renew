import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { EnvironmentService } from '@crc/shared';

import { CasinoService } from '../services/casino.service';
import { CasinoGame, ProviderCasinoGames } from '../entity';
import { map } from 'rxjs/operators';
import { FilterItemView } from '@crc/components';
import { CASINO_GROUPS } from '../constants/casino-group-filter-items';

@Injectable({
  providedIn: 'root'
})
export class CasinoFacade {
  providersWithCasinos$ = this.casinosService
    .getProvidersWithCasinos(this.env.config.platform)
    .pipe(shareReplay(1));

  allCasinos$: Observable<CasinoGame[]> = this.providersWithCasinos$.pipe(
    map((providers) => {
      return providers.reduce((sum: CasinoGame[], cur) => {
        return [...sum, ...cur.games];
      }, []);
    }),
    shareReplay(1)
  );

  groups$: Observable<FilterItemView[]> = this.allCasinos$.pipe(
    map((casinos) => {
      const groups: FilterItemView[] = [];

      // TODO duplicated logic
      CASINO_GROUPS.forEach((groupName) => {
        groups.push({
          filter: groupName,
          name: groupName,
          totalCount: casinos.filter((c) => c.group_name?.includes(groupName))
            .length
        });
      });

      groups.push({
        filter: 'show_games',
        name: 'show games',
        totalCount: casinos.filter(
          (c) =>
            !CASINO_GROUPS.reduce((res, cur) => {
              return res || c.group_name?.includes(cur);
            }, false)
        ).length
      });

      return groups;
    })
  );

  providers$ = this.casinosService
    .getCasinoProviders(this.env.config.platform)
    .pipe(shareReplay(1));

  constructor(
    private casinosService: CasinoService,
    private env: EnvironmentService
  ) {}

  getProviderWithCasinos(provider: string): Observable<ProviderCasinoGames> {
    return this.providersWithCasinos$.pipe(
      map((provides) => provides.filter((p) => p.provider === provider)[0])
    );
  }
}
