import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { SlotGame, FavoriteSlotGame } from '@crc/facade';

@Component({
  selector: 'crc-w-slot-list-presentation',
  templateUrl: './slot-list-presentation.component.html',
  styleUrls: ['./slot-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotListPresentationComponent {
  @Input() slots: FavoriteSlotGame[];
  @Input() firstItemLarge: boolean;

  @Output() slotFavoritesClick = new EventEmitter<FavoriteSlotGame>();
  @Output() played = new EventEmitter<SlotGame>();

  onSlotFavoritesClick(item: FavoriteSlotGame) {
    this.slotFavoritesClick.emit(item);
    item.isFavorite = !item.isFavorite;
  }

  onPlayClick(slotGame: SlotGame) {
    this.played.emit(slotGame);
  }

  slotById(index: number, slot: SlotGame) {
    return slot.game_id;
  }
}
