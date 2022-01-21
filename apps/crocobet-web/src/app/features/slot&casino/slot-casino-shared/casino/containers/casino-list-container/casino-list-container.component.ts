import { ChangeDetectionStrategy, Component } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { replaceImage } from '@crc/shared';
import { CasinoFiltersFacade, CasinoPlayFacade, CasinoGame } from '@crc/facade';

@Component({
  selector: 'crc-w-casino-list-container',
  templateUrl: './casino-list-container.component.html',
  styleUrls: ['./casino-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasinoListContainerComponent {
  items$: Observable<CasinoGame[]>;

  constructor(
    private readonly casinoFiltersFacade: CasinoFiltersFacade,
    private readonly playFacade: CasinoPlayFacade
  ) {
    this.items$ = this.casinoFiltersFacade.filteredCasinos$.pipe(
      switchMap((data: CasinoGame[]) =>
        from(data).pipe(
          map((item: CasinoGame) => {
            replaceImage<CasinoGame>('casino', item.provider, item).image;
            return { ...item };
          }),
          toArray()
        )
      )
    );
  }

  onPlayed(casinoGame: CasinoGame) {
    this.playFacade.play(casinoGame);
  }
}
