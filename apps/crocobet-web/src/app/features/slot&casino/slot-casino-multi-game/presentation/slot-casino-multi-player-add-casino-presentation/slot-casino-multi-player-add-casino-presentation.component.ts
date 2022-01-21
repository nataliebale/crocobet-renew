import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlotsFiltersFacade } from '@crc/facade';

@Component({
  selector: 'crc-w-slot-casino-multi-player-add-casino-presentation',
  templateUrl:
    './slot-casino-multi-player-add-casino-presentation.component.html',
  styleUrls: [
    './slot-casino-multi-player-add-casino-presentation.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoMultiPlayerAddCasinoPresentationComponent {
  constructor(private readonly slotsFiltersFacade: SlotsFiltersFacade) {
    slotsFiltersFacade.resetFilter();
  }
}
