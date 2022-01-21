import { Component, ChangeDetectionStrategy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { SlotGame, SlotsPlayFacade, SlotsFacade } from '@crc/facade';
import {
  createImageSlideCallBack,
  ImageSlideCallBacked
} from '@crc/components';
import { replaceImage } from '@crc/shared';

@Component({
  selector: 'crc-w-top-slots-container',
  templateUrl: './top-slots-container.component.html',
  styleUrls: ['./top-slots-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSlotsContainerComponent {
  $topGames: Observable<ImageSlideCallBacked<SlotGame>[]>;

  constructor(
    private readonly slotsFacade: SlotsFacade,
    private readonly slotsPlayFacade: SlotsPlayFacade
  ) {
    this.$topGames = this.slotsFacade.topSlots$.pipe(
      switchMap((topGames: SlotGame[]) =>
        from(topGames).pipe(
          map((slotGame: SlotGame) =>
            createImageSlideCallBack(
              slotGame,
              replaceImage<SlotGame>('slot', slotGame.provider, slotGame).image,
              null,
              null,
              '_self'
            )
          ),
          toArray()
        )
      )
    );
  }

  onSlotSelect(slotGame: SlotGame) {
    this.slotsPlayFacade.play(slotGame);
  }
}
