import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AccountFacade,
  AuthFacade,
  BACKGAMMON_WEEKLY,
  BURA_WEEKLY,
  DOMINO_WEEKLY,
  GameClass,
  GamesFacade,
  GameType,
  GameTypeById,
  LoginGuardFacade,
  NotVerifiedGuard,
  Tournament,
  VerificationStatus,
  Weekly
} from '@crc/facade';
import {
  combineLatest,
  filter,
  from,
  Observable,
  of,
  switchMap,
  take,
  tap
} from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'crc-games-container',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesContainerComponent {
  // weekly
  dominoWeekly: Weekly[] = this.gamesFacade.getWeekly(DOMINO_WEEKLY);
  backgammonWeekly: Weekly[] = this.gamesFacade.getWeekly(BACKGAMMON_WEEKLY);
  buraWeekly: Weekly[] = this.gamesFacade.getWeekly(BURA_WEEKLY);

  //tournaments
  dominoTournaments$: Observable<Tournament[]> = this.gamesFacade.getTournament(
    GameType.domino
  );
  backgammonTournaments$: Observable<Tournament[]> =
    this.gamesFacade.getTournament(GameType.backgammon);
  buraTournaments$: Observable<Tournament[]> = this.gamesFacade.getTournament(
    GameType.bura
  );

  showTournaments = true;
  showWeeklyRatings = false;
  verificationStatus: number;
  game = GameTypeById;
  gameClass = GameClass;
  type = GameType;

  constructor(
    private readonly gamesFacade: GamesFacade,
    private readonly accountFacade: AccountFacade,
    private readonly authFacade: AuthFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly notVerifiedGuard: NotVerifiedGuard
  ) {
    this.getVerificationStatus();
  }

  onGoToGame(gameType: GameTypeById) {
    this.authFacade
      .isLoggedIn$()
      .pipe(
        take(1),
        untilDestroyed(this),
        switchMap((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.loginGuardFacade.openLoginModal();
            return this.loginGuardFacade.getLoginResult$();
          } else {
            return of(isLoggedIn);
          }
        }),
        switchMap((loggedIn) => {
          return this.accountFacade.isVerified$.pipe(
            take(1),
            map((verified) => [loggedIn, verified])
          );
        }),
        switchMap(([loggedIn, verified]) => {
          if (loggedIn) {
            if (verified) {
              return combineLatest([
                this.getGameLink(gameType).pipe(
                  map((url) => this.gamesFacade.replaceLanguage(url))
                ),
                this.getUfoLink(gameType)
              ]).pipe(
                tap(([gameLink, ufoLink]) => {
                  const ufoToken = ufoLink.split('/')[6];
                  const finalUrl = `${gameLink}?ufo-token=${ufoToken}&old=${this.verificationStatus}`;
                  const win = window.open(finalUrl, '_blank');
                  win.focus();
                })
              );
            } else {
              return from(this.notVerifiedGuard.redirectToVerification());
            }
          } else {
            return of({});
          }
        })
      )
      .subscribe();
  }

  getGameLink(gameType): Observable<string> {
    return this.accountFacade.personalData$.pipe(
      filter((pData) => !!pData.customerId),
      take(1),
      switchMap((item) => {
        return this.gamesFacade.getGameLink(
          'lambda',
          item.customerId,
          gameType
        );
      })
    );
  }

  getUfoLink(gameType): Observable<string> {
    return this.accountFacade.personalData$.pipe(
      filter((pData) => !!pData.customerId),
      take(1),
      switchMap((item) => {
        return this.gamesFacade.getGameLink('ufo', item.customerId, gameType);
      })
    );
  }

  getVerificationStatus() {
    this.accountFacade.verificationStatus$
      .pipe(
        untilDestroyed(this),
        tap((item) => {
          item === VerificationStatus.VERIFIED
            ? (this.verificationStatus = 1)
            : (this.verificationStatus = 2);
        })
      )
      .subscribe();
  }
}
