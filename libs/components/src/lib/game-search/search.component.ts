import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SearchGameViewData } from './entity/search-game-view-data';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-game-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input() searchGameData: SearchGameViewData[] = [];
  @Input() gameContentVisibility: boolean;
  @Input() contentHeight: 'sm' | 'md' | 'lg' = 'sm';
  @Output() keyUp: EventEmitter<string> = new EventEmitter();
  @Output() selectGame = new EventEmitter();

  inputValue = new FormControl('');
  iconVisibility = true;

  constructor() {
    this.inputValue.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => {
          this.iconVisibility = value.length === 0 || value === '';
          this.keyUp.emit(value);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onGameSelect(gameData: SearchGameViewData) {
    this.selectGame.emit(gameData.callBack);
    this.onClearAll();
  }

  onClearAll() {
    this.inputValue.reset('');
    this.iconVisibility = true;
    this.gameContentVisibility = false;
  }
}
