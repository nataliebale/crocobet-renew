import { Injectable } from '@angular/core';

import { StorageService } from '@crc/shared';
import { SlotGame } from '../entity';

const key = 'slot:history';
const totalToSave = 50;

@Injectable({
  providedIn: 'root'
})
export class SlotsHistoryStorage extends StorageService<typeof key> {
  private addSlot(game: SlotGame) {
    const oldGames = this.getSlots();
    const newGames = [game, ...oldGames];
    this.set(key, JSON.stringify(newGames));
  }

  private removeSlot(game: SlotGame) {
    const newGames = this.getSlots().filter(
      (item) => item.game_id !== game.game_id
    );
    this.set(key, JSON.stringify(newGames));
  }

  private removeLastIfFull() {
    const slots = this.getSlots();
    if (slots.length > totalToSave) {
      slots.pop();
      this.set(key, JSON.stringify(slots));
    }
  }

  getSlots(): SlotGame[] {
    return JSON.parse(<string> this.get(key)) ?? [];
  }

  addOrUpSlot(slot: SlotGame) {
    this.removeSlot(slot);
    this.addSlot(slot);
    this.removeLastIfFull();
  }
}
