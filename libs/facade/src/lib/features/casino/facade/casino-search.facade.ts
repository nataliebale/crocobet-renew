import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { EnvironmentService } from '@crc/shared';

import { CasinoGameSearch } from '../entity';
import { CasinoService } from '../services/casino.service';

@Injectable()
export class CasinoSearchFacade {
  private $casinoGames = new BehaviorSubject<CasinoGameSearch[]>([]);
  casinoGames$: Observable<CasinoGameSearch[]> =
    this.$casinoGames.asObservable();

  constructor(
    private service: CasinoService,
    private environment: EnvironmentService
  ) {}

  searchCasinoGames(filter: string) {
    this.service
      .searchCasinos(this.environment.config.platform, filter)
      .pipe(tap((games) => this.$casinoGames.next(games)))
      .subscribe();
  }

  resetCasinoGames() {
    this.$casinoGames.next([]);
  }
}
