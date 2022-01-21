import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ImageSlideCallBacked } from '@crc/components';

@Component({
  selector: 'crc-jackpot-presentation',
  templateUrl: './jackpot-presentation.component.html',
  styleUrls: ['./jackpot-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JackpotPresentationComponent {
  @Input() jackpots: ImageSlideCallBacked<string>;

  @Output() clicked = new EventEmitter<unknown>();
}
