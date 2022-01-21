import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Tournament } from '@crc/facade';
import { isToday } from '@crc/shared';

@Component({
  selector: 'crc-poker-presentation',
  templateUrl: './poker-presentation.component.html',
  styleUrls: ['./poker-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokerPresentationComponent {
  @Input() tournamentsData: Tournament[];
  @Output() getPokerLink: EventEmitter<void> = new EventEmitter<void>();
  currentTime: Date = new Date();

  openPoker() {
    this.getPokerLink.emit();
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }
}
