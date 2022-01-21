import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, Observable, of, switchMap, take, tap } from 'rxjs';

import {
  AccountFacade,
  AuthFacade,
  GamesFacade,
  GameType,
  LoginGuardFacade,
  NotVerifiedGuard,
  PokerFacade,
  Tournament
} from '@crc/facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crc-poker-container',
  templateUrl: './poker-container.component.html',
  styleUrls: ['./poker-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class PokerContainerComponent {
  tournamentsData$: Observable<Tournament[]> = this.gamesFacade.getTournament(
    GameType.poker
  );

  private openInNewWindow(url: string) {
    window.open(
      `https://launch.crocobet.com/#/play?url=
      ${this.pokerFacade.getLaunchUrl(this.gamesFacade.replaceLanguage(url))}`,
      '',
      'width=800,height=600'
    );
  }

  constructor(
    private readonly pokerFacade: PokerFacade,
    private readonly gamesFacade: GamesFacade,
    private readonly authFacade: AuthFacade,
    private readonly accountFacade: AccountFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly notVerifiedGuard: NotVerifiedGuard
  ) {}

  getPokerLink() {
    this.authFacade
      .isLoggedIn$()
      .pipe(
        take(1),
        untilDestroyed(this),
        switchMap((isLoggedIn) => {
          if (isLoggedIn) {
            return of(true);
          } else {
            this.loginGuardFacade.openLoginModal();
            return this.loginGuardFacade.getLoginResult$();
          }
        }),
        switchMap((loggedIn) => {
          return loggedIn
            ? this.accountFacade.isVerified$.pipe(
                take(1),
                map((verified) => [loggedIn, verified])
              )
            : of([false, false]);
        }),
        switchMap(([loggedIn, verified]) => {
          if (loggedIn) {
            if (verified) {
              return this.pokerFacade
                .getPokerLink()
                .pipe(tap((link) => this.openInNewWindow(link)));
            } else {
              return of(this.notVerifiedGuard.redirectToVerification());
            }
          }
          return of({});
        })
      )
      .subscribe();
  }
}
