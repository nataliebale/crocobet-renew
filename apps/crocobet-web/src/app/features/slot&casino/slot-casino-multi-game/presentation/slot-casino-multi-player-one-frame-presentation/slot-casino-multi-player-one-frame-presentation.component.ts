import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'crc-w-slots-casino-multi-player-one-frame',
  templateUrl:
    './slot-casino-multi-player-one-frame-presentation.component.html',
  styleUrls: [
    './slot-casino-multi-player-one-frame-presentation.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoMultiPlayerOneFramePresentationComponent {
  @Input() iframeUrl: string;
}
