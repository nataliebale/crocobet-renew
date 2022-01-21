import { Injectable } from '@angular/core';

import { StorageService } from '@crc/shared';
import { SlotGame } from '../entity';

const key = 'slot:favorites';

@Injectable({
  providedIn: 'root'
})
export class SlotsFavoriteStorage extends StorageService<typeof key> {
  addSlot(game: SlotGame) {
    const oldGames = this.getSlots();

    if (!oldGames) {
      this.set(key, JSON.stringify([game]));
      return;
    }

    const newGames = this.isSlotFavorite(game) ? oldGames : [...oldGames, game];
    this.set(key, JSON.stringify(newGames));
  }

  removeSlot(game: SlotGame) {
    const oldGames = this.getSlots();
    if (!oldGames) return;
    const newGames = oldGames.filter((item) => item.game_id !== game.game_id);
    this.set(key, JSON.stringify(newGames));
  }

  getSlots(): SlotGame[] {
    return JSON.parse(<string> this.get(key));
  }

  isSlotFavorite(game: SlotGame): boolean {
    const oldGames = this.getSlots();
    return oldGames
      ? oldGames.some((item) => item.game_id === game.game_id)
      : false;
  }
}
