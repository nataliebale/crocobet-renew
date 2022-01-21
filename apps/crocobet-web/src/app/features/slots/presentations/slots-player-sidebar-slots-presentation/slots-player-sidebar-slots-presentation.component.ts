import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { SlotsPlayersSidebarInfo } from './slots-players-sidebar-info';
import { FavoriteSlotGame, SlotGame } from '@crc/facade';

@Component({
  selector: 'crc-w-slots-player-sidebar-slots-presentation',
  templateUrl: './slots-player-sidebar-slots-presentation.component.html',
  styleUrls: ['./slots-player-sidebar-slots-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotsPlayerSidebarSlotsPresentationComponent {
  @Input() slots: SlotsPlayersSidebarInfo[];
  @Input() title: string;

  @Output() playClicked = new EventEmitter();
  @Output() favoriteClicked = new EventEmitter();

  onFavoriteClick(slot: FavoriteSlotGame) {
    slot.isFavorite = !slot.isFavorite;
    this.favoriteClicked.emit(slot);
  }

  slotById(index: number, slot: SlotGame) {
    return slot.game_id;
  }
}
