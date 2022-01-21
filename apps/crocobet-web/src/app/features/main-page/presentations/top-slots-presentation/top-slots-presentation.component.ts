import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ImageSlide } from '@crc/components';
import { SlotGame } from '@crc/facade';

@Component({
  selector: 'crc-w-top-slots-presentation',
  templateUrl: './top-slots-presentation.component.html',
  styleUrls: ['./top-slots-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSlotsPresentationComponent {
  @Input() slots: ImageSlide[];
  @Output() slotSelected: EventEmitter<SlotGame> = new EventEmitter();
}
