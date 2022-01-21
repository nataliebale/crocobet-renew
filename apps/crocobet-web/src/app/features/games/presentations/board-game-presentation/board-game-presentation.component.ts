import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Tournament, Weekly } from '@crc/facade';

@Component({
  selector: 'crc-w-board-game-presentation',
  templateUrl: './board-game-presentation.component.html',
  styleUrls: ['./board-game-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardGamePresentationComponent {
  @Input() tournamentItems: Tournament[];
  @Input() weeklyRatingItems: Weekly[];
  @Input() showTournaments: boolean;
  @Input() showWeeklyRatings: boolean;
  @Input() gameType: string;
  @Input() gameClass: string;
  @Output() gameClick = new EventEmitter<MouseEvent>();
  @Output() tournaments = new EventEmitter<MouseEvent>();
  @Output() weeklyRatings = new EventEmitter<MouseEvent>();
  @ViewChild('content') content: ElementRef<HTMLInputElement>;

  onShowTournaments() {
    this.showTournaments = true;
    this.showWeeklyRatings = false;
    this.content.nativeElement.scrollTo(0, 0);
  }

  onShowWeeklyRatings() {
    this.showTournaments = false;
    this.showWeeklyRatings = true;
    this.content.nativeElement.scrollTo(0, 0);
  }
}
