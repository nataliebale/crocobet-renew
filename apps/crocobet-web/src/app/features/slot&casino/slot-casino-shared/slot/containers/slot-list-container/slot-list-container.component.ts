import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { replaceImage } from '@crc/shared';
import {
  SlotsPlayFacade,
  SlotsFavoriteFacade,
  SlotsFiltersFacade,
  SlotGame,
  FavoriteSlotGame
} from '@crc/facade';

@Component({
  selector: 'crc-w-slots-list-container',
  templateUrl: './slot-list-container.component.html',
  styleUrls: ['./slot-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotListContainerComponent {
  items$: Observable<SlotGame[]>;

  @Input() firstItemLarge = false;

  constructor(
    private readonly slotsFavoriteFacade: SlotsFavoriteFacade,
    private readonly slotsFiltersFacade: SlotsFiltersFacade,
    private readonly playFacade: SlotsPlayFacade
  ) {
    this.items$ = this.slotsFiltersFacade.filteredSlots$.pipe(
      switchMap((data: SlotGame[]) =>
        from(data).pipe(
          map((item: SlotGame) => {
            replaceImage<SlotGame>('slot', item.provider, item).image;
            const isFavorite = this.slotsFavoriteFacade.isSlotInFavorites(item);
            return { ...item, isFavorite };
          }),
          toArray()
        )
      )
    );
  }

  onSlotFavoritesClick(slot: FavoriteSlotGame) {
    this.slotsFavoriteFacade.toggleFavorite(slot);
  }

  onPlayed(slotGame: SlotGame) {
    this.playFacade.play(slotGame);
  }
}
