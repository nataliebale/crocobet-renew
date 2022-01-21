import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  disableScrollOnSpaceBar,
  removeDisableScrollOnSpaceBar,
  scrollWindowTo
} from '@crc/shared';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, from, switchMap, tap } from 'rxjs';
import {
  GAME_TYPE_CASINO,
  GAME_TYPE_SLOT
} from '../../presentation/slot-casino-multi-player-presentation/constants/game-type';
import { CasinoPlayFacade, SlotsPlayFacade } from '@crc/facade';
import { FilterItemView } from '@crc/components';

enum SplitScreenTypes {
  OneFrame,
  TwoFrames,
  FourFrames
}

@UntilDestroy()
@Component({
  selector: 'crc-w-slot-casino-multi-player',
  templateUrl: './slot-casino-multi-player-container.component.html',
  styleUrls: ['./slot-casino-multi-player-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotCasinoMultiPlayerContainerComponent
  implements OnInit, OnDestroy {
  public splitScreenTypes = SplitScreenTypes;
  public splitScreenType = this.splitScreenTypes.FourFrames;
  private readonly HEADER_HEIGHT = 60;

  private gameFrameOrder: Map<string, number> = new Map<string, number>();
  public isLoggedIn = false;

  addGameType: string;
  showChooseNewGame = false;
  addGameFilterItems: FilterItemView[];
  addGameSelector: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private slotsPlayFacade: SlotsPlayFacade,
    private casinoPlayFacade: CasinoPlayFacade
  ) {
    this.slotsPlayFacade.play$
      .pipe(
        untilDestroyed(this),
        filter((_) => this.showChooseNewGame === true),
        switchMap(([slotName, providerName]) => {
          return from(
            this.router.navigate(['/slot-casino'], {
              queryParamsHandling: 'merge',
              queryParams: {
                [this.addGameSelector + '-gameName']: this.formatName(slotName),
                [this.addGameSelector + '-provider']: providerName,
                [this.addGameSelector + '-type']: GAME_TYPE_SLOT
              }
            })
          );
        }),
        tap((_) => (this.showChooseNewGame = false))
      )
      .subscribe();

    this.casinoPlayFacade.play$
      .pipe(
        untilDestroyed(this),
        filter((_) => this.showChooseNewGame === true),
        switchMap(([slotName, providerName, gameId]) => {
          return from(
            this.router.navigate(['/slot-casino'], {
              queryParamsHandling: 'merge',
              queryParams: {
                [this.addGameSelector + '-gameName']: this.formatName(slotName),
                [this.addGameSelector + '-provider']: providerName,
                [this.addGameSelector + '-type']: GAME_TYPE_CASINO,
                [this.addGameSelector + '-game_id']: gameId
              }
            })
          );
        }),
        tap((_) => (this.showChooseNewGame = false))
      )
      .subscribe();
  }

  ngOnInit() {
    this.scrollUp();
    // this.subscribeToLogout();
    disableScrollOnSpaceBar();
    this.initSplitScreenType();
    this.addGameFrame('game1');
    this.addGameFrame('game2');
    this.addGameFrame('game3');
    this.addGameFrame('game4');
    this.addGameFilterItems = [
      {
        name: 'Slots',
        filter: '1'
      },
      {
        name: 'Casino',
        filter: '2'
      }
    ];

    this.switchAddGameFilter(
      this.route.snapshot.queryParams['default-game-type'] ?? '1'
    );
    this.sortFiltersByActive();
  }

  ngOnDestroy(): void {
    removeDisableScrollOnSpaceBar();
  }

  // todo
  /* After logout games are removed, login popup is displayed and if login again games are returned */
  // private subscribeToLogout(): void {
  //   // this.isLoggedIn$ = this.store.select(isLoggedIn);
  //
  //   const subscription: Subscription = this.isLoggedIn$.subscribe(
  //     (state) => {
  //       this.isLoggedIn = state;
  //       if (!state) {
  //         const queryParams = this.route.snapshot.queryParams;
  //         this.router.navigate(['/slots/splits']);
  //         this.ErrorModalConfig.onSuccess = () => {
  //           this.router.navigate(['/slots/split'], { queryParams });
  //         };
  //         this.notAuthorised();
  //       }
  //     },
  //     (err) => console.error(err)
  //   );
  //   this.subscriptions.push(subscription);
  // }

  private initSplitScreenType(): void {
    const fromQueryParams = Number(
      this.route.snapshot.queryParams['splitScreenType']
    );
    if (isNaN(fromQueryParams)) {
      this.splitScreenType = this.splitScreenTypes.FourFrames;
    } else {
      this.splitScreenType = fromQueryParams;
    }
  }

  public changeSplitScreenType(type: SplitScreenTypes): void {
    if (type !== this.splitScreenType) {
      const frameCountDecreased: boolean = this.splitScreenType - type > 0;

      if (frameCountDecreased) {
        const itemsToReorder: Array<{ selector: string; order: number }> =
          Array.from(this.gameFrameOrder.keys())
            .filter((selector) => this.hasGameOpened(selector))
            .map((selector) => ({
              selector,
              order: this.gameFrameOrder.get(selector)
            }))
            .sort((itemOne, itemTwo) => itemOne.order - itemTwo.order);

        itemsToReorder.forEach((item) => {
          this.moveTo(item.selector, itemsToReorder.indexOf(item) + 1);
        });
      }

      this.splitScreenType = type;
      this.updateFrameCountQueryParams();
    }
  }

  public addGameFrame(selector: string): number {
    const order = Number(this.route.snapshot.queryParams[selector + '-order']);
    if (order && !isNaN(order)) {
      this.gameFrameOrder.set(selector, order);
    } else {
      this.gameFrameOrder.set(selector, this.gameFrameOrder.size + 1);
    }
    return this.gameFrameOrder.get(selector);
  }

  public getPositionOf(selector: string): number {
    return this.gameFrameOrder.get(selector);
  }

  public moveTo(selector: string, position: number) {
    const destination = this.getSelectorOf(position);
    this.setPosition(destination, this.getPositionOf(selector));
    this.setPosition(selector, position);
    this.updatePositionQueryParams(this.gameFrameOrder);
  }

  private getSelectorOf(position: number): string {
    let selector: string = null;
    this.gameFrameOrder.forEach((value, key) => {
      if (value === position) {
        selector = key;
      }
    });
    return selector;
  }

  private setPosition(selector: string, position: number) {
    this.gameFrameOrder.set(selector, position);
  }

  private updatePositionQueryParams(gameFrameOrder: Map<string, number>): void {
    const newQueryParams = {} as any;
    gameFrameOrder.forEach((order, selector) => {
      newQueryParams[selector + '-order'] = order;
    });

    this.router
      .navigate(['/slot-casino'], {
        queryParamsHandling: 'merge',
        queryParams: newQueryParams
      })
      .then();
  }

  private hasGameOpened(selector: string): boolean {
    return !!this.route.snapshot.queryParams[selector + '-gameName'];
  }

  public isVisible(selector: string): boolean {
    let itemsToDisplay = 4;

    if (this.splitScreenType === SplitScreenTypes.TwoFrames) {
      itemsToDisplay = 2;
    } else if (this.splitScreenType === SplitScreenTypes.OneFrame) {
      itemsToDisplay = 1;
    }

    return this.gameFrameOrder.get(selector) <= itemsToDisplay;
  }

  private updateFrameCountQueryParams(): void {
    this.router
      .navigate(['/slot-casino'], {
        queryParamsHandling: 'merge',
        queryParams: { splitScreenType: this.splitScreenType }
      })
      .then();
  }

  public scrollUp(): void {
    scrollWindowTo(this.HEADER_HEIGHT);
  }

  public notAuthorised() {
    // OPEN LOGIN PAGE
  }

  private formatName(name: string): string {
    return name ? name.replace(/\s+/g, '').toLowerCase() : '';
  }

  openAddGame(selector: string) {
    this.showChooseNewGame = true;
    this.addGameSelector = selector;
  }

  switchAddGameFilter(filter: string) {
    this.addGameFilterItems = this.addGameFilterItems.map((f) => {
      return { ...f, active: f.filter === filter };
    });
    this.addGameType = filter;
  }

  sortFiltersByActive() {
    this.addGameFilterItems = this.addGameFilterItems.sort((pre, f) =>
      f.active ? 1 : -1
    );
  }
}
