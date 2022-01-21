import { Injectable } from '@angular/core';
import { EnvironmentService } from '@crc/shared';

import { SlotGame } from '../entity';
import { Subject } from 'rxjs';
import { SlotsHistoryStorage } from '../storage/slots-histoy.storage';

@Injectable({ providedIn: 'root' })
export class SlotsHistoryFacade {
  private readonly $historyTrigger = new Subject<void>();
  readonly historyTrigger$ = this.$historyTrigger.asObservable();

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly slotsHistoryStorage: SlotsHistoryStorage
  ) {}

  addSlotToHistory(slot: SlotGame) {
    this.slotsHistoryStorage.addOrUpSlot(slot);
    this.$historyTrigger.next();
  }

  getSlotsHistory(): SlotGame[] {
    return this.slotsHistoryStorage.getSlots();
  }
}
