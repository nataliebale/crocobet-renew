import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  from,
  Subject,
  tap
} from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  CasinoFacade,
  FavoriteSlotGame,
  ProviderSlotGames,
  SlotGame,
  SlotsFacade,
  SlotsFavoriteFacade
} from '@crc/facade';
import { openInNewWindow } from '@crc/shared';

import {
  GAME_TYPE_CASINO,
  GAME_TYPE_SLOT
} from '../../../../slot-casino-multi-game/presentation/slot-casino-multi-player-presentation/constants/game-type';
import { TopProviderConfig } from '../../../../slot-casino-multi-game/presentation/slot-casino-multi-player-presentation/constants/TopProviderConfig';
import { map } from 'rxjs/operators';

export const TopProviderConst = {
  IFRAME_HEIGHT: 600,
  IFRAME_WIDTH: 953,
  NAME: 'Top Provider',
  ORDER: 0,
  PROVIDER: 'popular'
};

@UntilDestroy()
@Component({
  selector: 'crc-w-slot-casino-player-container',
  templateUrl: './slot-casino-player-container.component.html',
  styleUrls: ['./slot-casino-player-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoPlayerContainerComponent {
  @ViewChild('iframeWrapper') iframeWrapper?: ElementRef;

  slotHeight = 600;
  readonly IGROSOFT_DEFAULT_RATIO = 9 / 16;
  gameName: string;
  providerName: string;
  gameType: number;
  gameId: string;
  selectedGame: SlotGame;
  game: SlotGame;
  gameIsOn: boolean;
  $isSlotFavorite = new Subject<boolean>();
  selectedProvider: ProviderSlotGames;
  $src = new BehaviorSubject<string>('');
  src$ = this.$src.asObservable();
  isFullScreen: boolean;

  constructor(
    private readonly slotsFacade: SlotsFacade,
    private readonly casinoFacade: CasinoFacade,
    private readonly route: ActivatedRoute,
    private readonly slotsFavoriteFacade: SlotsFavoriteFacade,
    private readonly router: Router
  ) {
    this.subscribeToQueryParams();

    this.slotsFavoriteFacade.favoriteTrigger$
      .pipe(
        untilDestroyed(this),
        filter((slot) => this.game?.game_id === slot.game_id),
        map((slot) => slot.isFavorite),
        tap((isFavorite) => this.$isSlotFavorite.next(isFavorite))
      )
      .subscribe();
  }

  subscribeToQueryParams() {
    this.route.queryParams
      .pipe(
        filter((params) => params.slot || params.casino),
        distinctUntilChanged((prev, cur) => {
          return (
            prev.slot !== undefined &&
            cur.slot !== undefined &&
            prev.slot === cur.slot &&
            prev.provider === cur.provider
          );
        }),
        distinctUntilChanged((prev, cur) => {
          return (
            prev.casino !== undefined &&
            cur.casino !== undefined &&
            prev.casino === cur.casino &&
            prev.provider === cur.provider
          );
        }),
        tap((item: any) => {
          this.$src.next(null);
          this.openGame(item);
          this.scrollToTop();
        })
      )
      .subscribe();
  }

  formatName(name: string): string {
    return name ? name.replace(/\s+/g, '').toLowerCase() : '';
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  addSlotToFavorites() {
    this.slotsFavoriteFacade.toggleFavorite(this.game as FavoriteSlotGame);
  }

  openGame(item: any) {
    if (item.slot) {
      this.openSlotGame(item.slot, item.provider);
    } else {
      this.openCasinoGame(item.casino, item.provider, item.game_id);
    }
  }

  openSlotGame(gameName: string, providerId: string) {
    const searchAndOpenGame = (provider: ProviderSlotGames) => {
      const slotGame = provider.games.find(
        (game) => this.formatName(game.name) === this.formatName(gameName)
      );
      if (slotGame) {
        this.game = slotGame;
        this.selectedGame = slotGame;
        this.selectedProvider = provider;
        this.setIframeSrc(slotGame);

        this.$isSlotFavorite.next(
          this.slotsFavoriteFacade.isSlotInFavorites(this.game)
        );
      }
    };

    this.gameName = gameName;
    this.providerName = providerId;
    this.gameType = GAME_TYPE_SLOT;

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
          untilDestroyed(this),
          tap((provider: ProviderSlotGames) => searchAndOpenGame(provider))
        )
        .subscribe();
    }
  }

  openCasinoGame(gameName: string, providerId: string, gameId: string) {
    this.gameName = gameName;
    this.providerName = providerId;
    this.gameId = gameId;
    this.gameType = GAME_TYPE_CASINO;

    this.casinoFacade
      .getProviderWithCasinos(providerId)
      .pipe(
        tap((provider: ProviderSlotGames) => {
          const casinoGame = provider.games.find(
            (game) => this.formatName(game.name) === this.formatName(gameName)
          );
          if (casinoGame) {
            this.game = casinoGame;
            this.selectedGame = casinoGame;
            this.selectedProvider = provider;
            this.setIframeSrc(casinoGame);
          }
        })
      )
      .subscribe();
  }

  setIframeSrc(selectedSlot: SlotGame): void {
    this.slotsFacade
      .getSlotGameFrameUrl(selectedSlot.url)
      .pipe(
        untilDestroyed(this),
        filter((res) => res !== ''),
        tap((res) => {
          this.getSlotHeight(this.selectedProvider);
          this.$src.next(res);
        })
      )
      .subscribe();
  }

  getSlotHeight(provider: any) {
    // TODO add game provider interface
    let ratio = 1;
    if (provider.provider === 'igrosoft') {
      ratio = this.IGROSOFT_DEFAULT_RATIO;
    } else if (provider.vendor === 'everymatrix') {
      ratio = TopProviderConst.IFRAME_HEIGHT / TopProviderConst.IFRAME_WIDTH;
    } else {
      ratio = provider.iframeH / provider.iframeW;
    }

    this.slotHeight = this.iframeWrapper.nativeElement.clientWidth * ratio;
  }

  inNewWindow() {
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
            this.redirectToMain();
          }
        }
      });
  }

  onSwitchToMultiGame() {
    // TODO duplicated
    from(
      this.router.navigate(['/slot-casino'], {
        queryParams: {
          ['game1-gameName']: this.formatName(this.selectedGame.name),
          ['game1-provider']: this.providerName,
          ['game1-type']: this.gameType,
          ['game1-game_id']: this.gameId,
          ['default-game-type']: this.gameType
        }
      })
    ).subscribe();
  }

  redirectToMain() {
    from(
      this.router.navigate(
        [this.gameType === GAME_TYPE_SLOT ? 'slots' : 'casino'],
        {
          queryParamsHandling: 'merge'
        }
      )
    ).subscribe();
  }
}
