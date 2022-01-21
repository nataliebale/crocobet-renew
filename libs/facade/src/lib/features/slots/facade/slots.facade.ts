import { Injectable } from '@angular/core';
import { EnvironmentService } from '@crc/shared';
import { Observable, shareReplay } from 'rxjs';

import { SlotsService } from '../services/slots.service';
import { ProviderSlotGames, SlotGame } from '../entity';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SlotsFacade {
  // TODO this should not be used in searching
  readonly popularSlots$: Observable<SlotGame[]>;
  readonly topSlots$: Observable<SlotGame[]>;

  readonly providersWithSlots$ = this.slotsService
    .getProvidersWithSlots(this.env.config.platform)
    .pipe(shareReplay(1));

  readonly providers$ = this.slotsService
    .getSlotProviders(this.env.config.platform)
    .pipe(shareReplay(1));

  constructor(
    private readonly slotsService: SlotsService,
    private readonly env: EnvironmentService
  ) {
    this.popularSlots$ = this.slotsService
      .getSlotsByCategory('web:popular', this.env.config.platform)
      .pipe(shareReplay(1));

    this.topSlots$ = this.slotsService
      .getSlotsByCategory('web:popular_main', this.env.config.platform)
      .pipe(shareReplay(1));
  }

  getProviderWithSlots(provider: string): Observable<ProviderSlotGames> {
    return this.providersWithSlots$.pipe(
      map((provides) => provides.filter((p) => p.provider === provider)[0])
    );
  }

  getSlotsByProvider(provider: string): Observable<SlotGame[]> {
    return this.providersWithSlots$.pipe(
      map(
        (provides) => provides.filter((p) => p.provider === provider)[0]?.games
      )
    );
  }

  getSlotsByCategory(category: string): Observable<SlotGame[]> {
    return this.slotsService.getSlotsByCategory(
      category,
      this.env.config.platform
    );
  }

  getSlotGameFrameUrl(url: string): Observable<string> {
    return this.slotsService.getSlotGameFrameUrl(url);
  }
}
