import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'crc-w-board-game-table-header-presentation',
  templateUrl: './board-game-table-header-presentation.component.html',
  styleUrls: ['./board-game-table-header-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGameTableHeaderPresentationComponent {
  @Input() showTournaments: boolean;
  @Input() gameClass: string;
}
