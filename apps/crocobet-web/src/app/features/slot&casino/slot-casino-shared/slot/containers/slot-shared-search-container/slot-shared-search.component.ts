import { Component, ChangeDetectionStrategy } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import {
  SlotsSearchFacade,
  SlotsPlayFacade,
  SlotGameSearch,
  SlotGame
} from '@crc/facade';
import { SearchGameViewData } from '@crc/components';
import { replaceImage } from '@crc/shared';

@Component({
  selector: 'crc-w-slot-shared-search-container',
  templateUrl: './slot-shared-search.component.html',
  styleUrls: ['./slot-shared-search.component.scss'],
  providers: [SlotsSearchFacade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotSharedSearchComponent {
  $slotGames: Observable<SearchGameViewData[]>;
  gameContentVisibility: boolean;

  constructor(
    private readonly slotSearchGamesFacade: SlotsSearchFacade,
    private readonly playFacade: SlotsPlayFacade
  ) {
    this.$slotGames = this.slotSearchGamesFacade.slotGames$.pipe(
      switchMap((slots) =>
        from(slots).pipe(
          map((slot: SlotGameSearch) => {
            replaceImage('slot', slot.provider.provider, slot.game);

            return {
              image: slot.game.image,
              providerName: slot.provider.provider,
              gameName: slot.game.name,
              callBack: slot.game
            } as SearchGameViewData;
          }),
          toArray()
        )
      )
    );
  }

  onGoToGame(slotGame: SlotGame) {
    this.playFacade.play(slotGame);
  }

  onFilter(query: string) {
    if (query?.length < 3) {
      this.gameContentVisibility = false;
      this.slotSearchGamesFacade.resetSlotGames();
    } else {
      this.gameContentVisibility = true;
      this.slotSearchGamesFacade.requestSlotGames(query);
    }
  }
}
