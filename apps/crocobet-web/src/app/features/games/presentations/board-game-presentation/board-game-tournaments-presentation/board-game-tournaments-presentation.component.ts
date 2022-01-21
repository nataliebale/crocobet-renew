import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Tournament } from '@crc/facade';
import { isToday, isNumber } from '@crc/shared';

@Component({
  selector: 'crc-w-board-game-tournaments-presentation',
  templateUrl: './board-game-tournaments-presentation.component.html',
  styleUrls: ['./board-game-tournaments-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGameTournamentsPresentationComponent {
  @Input() tournamentItems: Tournament[];
  @Input() showTournaments: boolean;
  @Input() gameClass: string;
  currentTime: Date = new Date();

  isToday(date: Date): boolean {
    return isToday(date);
  }

  isNumber(val): boolean {
    return isNumber(val);
  }
}
