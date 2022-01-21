import { Injectable } from '@angular/core';
import { EnvironmentService } from '@crc/shared';

import { SlotsFavoriteStorage } from '../storage/slots-favorite.storage';
import { FavoriteSlotGame, SlotGame } from '../entity';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SlotsFavoriteFacade {
  private readonly $favoriteTrigger = new Subject<FavoriteSlotGame>();
  readonly favoriteTrigger$ = this.$favoriteTrigger.asObservable();

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly slotsFavoriteStorage: SlotsFavoriteStorage
  ) {}

  private setSlotToFavorites(game: SlotGame) {
    this.slotsFavoriteStorage.addSlot(game);
  }

  private removeSlotFromFavorites(game: SlotGame) {
    this.slotsFavoriteStorage.removeSlot(game);
  }

  toggleFavorite(slot: FavoriteSlotGame) {
    this.isSlotInFavorites(slot)
      ? this.removeSlotFromFavorites(slot)
      : this.setSlotToFavorites(slot);
    this.$favoriteTrigger.next({
      ...slot,
      isFavorite: this.isSlotInFavorites(slot)
    });
  }

  isSlotInFavorites(game: SlotGame): boolean {
    return this.slotsFavoriteStorage.isSlotFavorite(game);
  }

  getFavoriteSlots(): SlotGame[] {
    return this.slotsFavoriteStorage.getSlots();
  }
}
