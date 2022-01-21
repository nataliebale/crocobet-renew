import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

import { CasinoGame } from '../entity';

@Injectable({ providedIn: 'root' })
export class CasinoPlayFacade {
  private readonly $play = new Subject<[string, string, string]>();
  play$ = this.$play.asObservable().pipe(filter((gameId) => !!gameId));

  constructor(private readonly router: Router) {}

  play(casinoGame: CasinoGame) {
    if (this.router.url.includes('slot-casino')) {
      this.$play.next([
        casinoGame.name,
        casinoGame.provider,
        casinoGame.game_id
      ]);
    } else {
      this.router
        .navigate(['/casino/play'], {
          queryParams: {
            casino: casinoGame.name,
            provider: casinoGame.provider,
            // eslint-disable-next-line camelcase
            game_id: casinoGame.game_id
          }
        })
        .then();
    }
  }
}
