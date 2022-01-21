import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CasinoGame } from '@crc/facade';

@Component({
  selector: 'crc-w-casino-list-presentation',
  templateUrl: './casino-list-presentation.component.html',
  styleUrls: ['./casino-list-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoListPresentationComponent {
  @Input() items: CasinoGame[];
  @Input() firstItemLarge: boolean;

  @Output() played = new EventEmitter<CasinoGame>();

  onPlayClick(casinoGame: CasinoGame) {
    this.played.emit(casinoGame);
  }
}
