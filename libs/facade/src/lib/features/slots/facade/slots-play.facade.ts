import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { SlotsHistoryFacade } from './slots-history.facade';
import { SlotGame } from '../entity';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SlotsPlayFacade {
  private readonly $play = new Subject<[string, string]>();
  play$ = this.$play.asObservable().pipe(filter((game) => !!game));

  constructor(
    private readonly slotsHistoryFacade: SlotsHistoryFacade,
    private readonly router: Router
  ) {}

  play(slotGame: SlotGame) {
    this.slotsHistoryFacade.addSlotToHistory(slotGame);
    if (this.router.url.includes('slot-casino')) {
      this.$play.next([slotGame.name, slotGame.provider]);
    } else {
      this.router
        .navigate(['/slots/play'], {
          queryParams: { slot: slotGame.name, provider: slotGame.provider }
        })
        .then();
    }
  }
}
