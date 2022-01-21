import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Weekly } from '@crc/facade';
import { isNumber } from '@crc/shared';

@Component({
  selector: 'crc-w-board-game-weekly-presentation',
  templateUrl: './board-game-weekly-presentation.component.html',
  styleUrls: ['./board-game-weekly-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGameWeeklyPresentationComponent {
  @Input() weeklyRatingItems: Weekly[];
  @Input() gameClass: string;

  isNumber(val): boolean {
    return isNumber(val);
  }
}
