import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlotsFiltersFacade } from '@crc/facade';

@Component({
  selector: 'crc-w-slot-casino-multi-player-add-slot-presentation',
  templateUrl:
    './slot-casino-multi-player-add-slot-presentation.component.html',
  styleUrls: [
    './slot-casino-multi-player-add-slot-presentation.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoMultiPlayerAddSlotPresentationComponent {
  constructor(private readonly slotsFiltersFacade: SlotsFiltersFacade) {
    slotsFiltersFacade.resetFilter();
  }
}
