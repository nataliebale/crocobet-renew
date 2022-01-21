import { Component, ChangeDetectionStrategy } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import {
  CasinoGameSearch,
  CasinoGame,
  CasinoSearchFacade,
  CasinoPlayFacade
} from '@crc/facade';
import { SearchGameViewData } from '@crc/components';
import { replaceImage } from '@crc/shared';

@Component({
  selector: 'crc-w-casino-shared-search-container',
  templateUrl: './casino-shared-search.component.html',
  styleUrls: ['./casino-shared-search.component.scss'],
  providers: [CasinoSearchFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoSharedSearchComponent {
  $casinoGames: Observable<SearchGameViewData[]>;
  gameContentVisibility: boolean;

  constructor(
    private readonly casinoSearchFacade: CasinoSearchFacade,
    private readonly playFacade: CasinoPlayFacade
  ) {
    this.$casinoGames = this.casinoSearchFacade.casinoGames$.pipe(
      switchMap((casinos) =>
        from(casinos).pipe(
          map((casino: CasinoGameSearch) => {
            replaceImage('casino', casino.provider.provider, casino.game);

            return {
              image: casino.game.image,
              providerName: casino.provider.provider,
              gameName: casino.game.name,
              callBack: casino.game
            } as SearchGameViewData;
          }),
          toArray()
        )
      )
    );
  }

  onGoToGame(casinoGame: CasinoGame) {
    this.playFacade.play(casinoGame);
  }

  onFilter(query: string) {
    if (query?.length < 3) {
      this.gameContentVisibility = false;
      this.casinoSearchFacade.resetCasinoGames();
    } else {
      this.gameContentVisibility = true;
      this.casinoSearchFacade.searchCasinoGames(query);
    }
  }
}
