import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { SlotGame } from '@crc/facade';

@Component({
  selector: 'crc-w-slot-casino-player-presentation',
  templateUrl: './slot-casino-player-presentation.component.html',
  styleUrls: ['./slot-casino-player-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoPlayerPresentationComponent {
  @ViewChild('slotGameElement') slotGameElement?: ElementRef;

  @Input() iframeSrc: string;
  @Input() gameType: number;
  @Input() slotHeight: number;
  @Input() gameName: string;
  @Input() isSlotFavorite: boolean;
  @Input() isFullScreen: boolean;

  @Output() addToFavorites: EventEmitter<string> = new EventEmitter<string>();
  @Output() openInNewWindow: EventEmitter<void> = new EventEmitter<void>();
  @Output() switchToMultiGame = new EventEmitter<void>();

  emitAddToFavorites() {
    this.addToFavorites.emit();
  }

  inNewWindow() {
    this.openInNewWindow.emit();
  }
}
