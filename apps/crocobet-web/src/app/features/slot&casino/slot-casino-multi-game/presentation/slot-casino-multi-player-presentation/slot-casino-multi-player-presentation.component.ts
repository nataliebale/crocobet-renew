import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, from, switchMap, tap } from 'rxjs';

import {
  CasinoFacade,
  CasinoPlayFacade,
  ProviderSlotGames,
  SlotGame,
  SlotsFacade,
  SlotsPlayFacade
} from '@crc/facade';
import { openInNewWindow } from '@crc/shared';

import { SplitScreenTypes } from './types';
import { TopProviderConfig } from './constants/TopProviderConfig';
import { GAME_TYPE_CASINO, GAME_TYPE_SLOT } from './constants/game-type';

@UntilDestroy()
@Component({
  selector: 'crc-w-slot-casino-multi-player-presentation',
  templateUrl: './slot-casino-multi-player-presentation.component.html',
  styleUrls: ['./slot-casino-multi-player-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoMultiPlayerPresentationComponent implements OnInit {
  @Input() position: number;
  @Input() splitScreenType: SplitScreenTypes;
  @Input() isLoggedIn: boolean;
  @Input() selector: string;
  @Input() fixed: boolean;

  @Output() move = new EventEmitter();
  @Output() notLoggedInAction = new EventEmitter();
  @Output() addGame = new EventEmitter<string>();

  private gameName: string;
  private providerName: string;
  private gameType: number;
  private selectedGame: SlotGame;
  private selectedProvider: ProviderSlotGames;

  splitScreenTypes = SplitScreenTypes;

  private $src = new BehaviorSubject<string>('');
  private gameId: string;

  src$ = this.$src.asObservable();
  gameIsOn = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private slotsFacade: SlotsFacade,
    private casinoFacade: CasinoFacade
  ) {}

  ngOnInit() {
    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((queryParams) => {
        this.openGame(queryParams);
      });
  }

  public selectGame() {
    this.addGame.emit(this.selector);
  }

  public selectNewGame() {
    if (this.gameIsOn) {
      this.selectGame();
    }
  }

  private openGame(queryParams: Params): void {
    if (queryParams[this.selector + '-gameName']) {
      const type = Number(queryParams[this.selector + '-type']);
      const gameName: string = queryParams[this.selector + '-gameName'];

      if (type === GAME_TYPE_SLOT) {
        const isSlotChanged =
          this.gameName !== gameName || type !== this.gameType;
        if (isSlotChanged) {
          const providerId: string = queryParams[this.selector + '-provider'];
          this.openSlotGame(gameName, providerId);
        }
      } else if (type === GAME_TYPE_CASINO) {
        const gameId: string = queryParams[this.selector + '-game_id'];
        const isCasinoChanged =
          this.gameName !== gameName ||
          type !== this.gameType ||
          this.gameId !== gameId;
        if (isCasinoChanged) {
          const providerId: string = queryParams[this.selector + '-provider'];
          this.openCasinoGame(gameId, gameName, providerId);
        }
      }
    } else {
      this.gameIsOn = false;
      this.$src.next('');
      this.gameId = '';
      this.gameName = '';
      this.providerName = '';
    }
  }

  private openSlotGame(gameName: string, providerId: string) {
    const searchAndOpenGame = (provider: ProviderSlotGames) => {
      const slotGame = provider.games.find(
        (game) => this.formatName(game.name) === gameName
      );
      if (slotGame) {
        this.gameName = gameName;
        this.providerName = providerId;
        this.gameType = GAME_TYPE_SLOT;
        this.gameId = '';

        this.selectedGame = slotGame;
        this.selectedProvider = provider;
        this.setIframeSrc(slotGame);
      }
    };

    if (providerId === TopProviderConfig.PROVIDER) {
      this.slotsFacade.popularSlots$
        .pipe(
          tap((games) => {
            searchAndOpenGame({
              name: TopProviderConfig.NAME,
              provider: TopProviderConfig.PROVIDER,
              iframeW: TopProviderConfig.IFRAME_WIDTH,
              iframeH: TopProviderConfig.IFRAME_HEIGHT,
              order: -1,
              games: games
            });
          }),
          untilDestroyed(this)
        )
        .subscribe();
    } else {
      this.slotsFacade
        .getProviderWithSlots(providerId)
        .pipe(
          tap((provider: ProviderSlotGames) => searchAndOpenGame(provider)),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }

  private openCasinoGame(gameId: string, gameName: string, providerId: string) {
    this.casinoFacade
      .getProviderWithCasinos(providerId)
      .pipe(
        tap((provider: ProviderSlotGames) => {
          const casinoGame = provider.games.find(
            (game) => game.game_id === gameId
          );
          if (casinoGame) {
            this.gameId = gameId;
            this.gameName = gameName;
            this.providerName = providerId;
            this.gameType = GAME_TYPE_CASINO;

            this.selectedGame = casinoGame;
            this.selectedProvider = provider;
            this.setIframeSrc(casinoGame);
          }
        })
      )
      .subscribe();
  }

  private setIframeSrc(selectedSlot: SlotGame): void {
    this.slotsFacade
      .getSlotGameFrameUrl(selectedSlot.url)
      .pipe(
        untilDestroyed(this),
        filter((res) => res !== ''),
        tap((res) => this.$src.next(res)),
        tap((_) => (this.gameIsOn = true))
      )
      .subscribe();
  }

  public formatName(name: string): string {
    return name ? name.replace(/\s+/g, '').toLowerCase() : '';
  }

  public moveTo(position: number): void {
    if (this.gameIsOn) {
      this.move.emit(position);
    }
  }

  public closeGame(): void {
    if (this.gameIsOn) {
      this.router
        .navigate(['/slot-casino'], {
          queryParamsHandling: 'merge',
          queryParams: {
            [this.selector + '-type']: '',
            [this.selector + '-gameName']: '',
            [this.selector + '-provider']: ''
          }
        })
        .then();
    }
  }

  public restartGame(): void {
    if (this.gameIsOn) {
      this.gameName = '';
      this.openGame(this.route.snapshot.queryParams);
    }
  }

  public inNewWindow() {
    if (this.gameIsOn) {
      this.closeGame();
      this.slotsFacade
        .getSlotGameFrameUrl(this.selectedGame.url)
        .pipe(untilDestroyed(this))
        .subscribe((response) => {
          if (response) {
            if (response !== '') {
              const iframeW: number = this.selectedProvider
                ? this.selectedProvider.iframeW
                : TopProviderConfig.IFRAME_WIDTH;
              const iframeH: number = this.selectedProvider
                ? this.selectedProvider.iframeH
                : TopProviderConfig.IFRAME_HEIGHT;
              openInNewWindow(response, iframeW, iframeH);
            }
          }
        });
    }
  }
}
