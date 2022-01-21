import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FavoriteSlotGame, SlotsFavoriteFacade } from '@crc/facade';
import { filter, Observable, startWith, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crc-w-slot-list-item-presentation',
  templateUrl: './slot-list-item-presentation.component.html',
  styleUrls: ['./slot-list-item-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotListItemPresentationComponent implements OnInit {
  @Input() slot: FavoriteSlotGame;

  @Output() favoriteClicked = new EventEmitter<FavoriteSlotGame>();
  @Output() playClicked = new EventEmitter<FavoriteSlotGame>();

  isSlotFavorite: Observable<boolean>;

  constructor(private readonly slotsFavoriteFacade: SlotsFavoriteFacade) {}

  ngOnInit() {
    this.isSlotFavorite = this.slotsFavoriteFacade.favoriteTrigger$.pipe(
      filter((slot) => this.slot.game_id === slot.game_id),
      map((slot) => slot.isFavorite),
      startWith(this.slot.isFavorite)
    );
  }
}
