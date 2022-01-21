import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  map,
  mapTo,
  mergeMap,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { HttpResponseCode } from '@crc/shared';

import { accountActions, authActions, captchaActions } from '../actions';
import { AuthService, SessionService } from '../../services';
import { AccountFacade, AuthFacade, LoginGuardFacade } from '../../facade';
import { AuthResponse, AuthState, PersonalData } from '../../entity';
import { NotVerifiedGuard } from '../../guards';
import { SignedInFeatureState } from '../state';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signIn),
      debounceTime(300),
      switchMap(({ payload }) => {
        return this.authService.signIn$(payload).pipe(
          mergeMap((response: AuthResponse) => {
            const { code, data } = response;
            if (code === HttpResponseCode.OK) {
              const payload: PersonalData = data;

              return [
                authActions.signInSuccess(),
                accountActions.updateUser({ payload }),
                accountActions.getUserInfo(),
                captchaActions.closeCaptchaModal()
              ];
            } else {
              this.sessionService.signOut();
              return [authActions.signInError({ payload: response })];
            }
          })
        );
      }),
      catchError((payload) => of(authActions.signInError(payload)))
    );
  });

  signInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signInSuccess),
      tap(() => this.authFacade.setLoginStatus$(AuthState.LOGGED_IN)),
      mergeMap(() => {
        if (this.loginGuardFacade.getShowLoginModal()) {
          this.loginGuardFacade.loginSuccess();
        } else if (this.router.url.includes('register')) {
          this.router.navigateByUrl('/').then();
        }

        return this.accountFacade.isVerified$.pipe(
          take(1),
          mergeMap((isVerified) => {
            if (!isVerified) {
              this.verifiedGuard.redirectToVerification().then();
              return [accountActions.keepSessionAliveEvery60Second()];
            } else {
              return [
                accountActions.updateBalanceEvery5Second(),
                accountActions.keepSessionAliveEvery60Second()
              ];
            }
          })
        );
      })
    );
  });

  signInError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signInError),
      debounceTime(300),
      map(({ payload }) => {
        this.authFacade.setLoginStatus$(AuthState.LOGIN_FAILED);
        return captchaActions.updateCaptchaCode({
          payload: payload?.captcha || ''
        });
      })
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.signOut),
      debounceTime(300),
      switchMap(() => {
        this.authFacade.setLoginStatus$(AuthState.LOGGED_OUT);
        this.sessionService.signOut();
        return this.authService.signOut$();
      }),
      tap(() => this.router.navigateByUrl('/')),
      mapTo(authActions.signOutSuccess())
    );
  });

  constructor(
    private readonly store$: Store<SignedInFeatureState>,
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly authFacade: AuthFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly sessionService: SessionService,
    private readonly accountFacade: AccountFacade,
    private readonly verifiedGuard: NotVerifiedGuard,
    private readonly router: Router
  ) {}
}
