import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { EnvironmentService } from '@crc/shared';

import { SlotGameSearch } from '../entity';
import { SlotsService } from '../services/slots.service';

@Injectable()
export class SlotsSearchFacade {
  private $slotGames = new BehaviorSubject<SlotGameSearch[]>([]);
  slotGames$: Observable<SlotGameSearch[]> = this.$slotGames.asObservable();

  constructor(
    private service: SlotsService,
    private environment: EnvironmentService
  ) {}

  requestSlotGames(filter: string) {
    this.service
      .getSlotSearchGames(this.environment.config.platform, filter)
      .pipe(tap((games) => this.$slotGames.next(games)))
      .subscribe();
  }

  resetSlotGames() {
    this.$slotGames.next([]);
  }
}
