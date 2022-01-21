import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { interval, mergeMap, of } from 'rxjs';
import {
  catchError,
  map,
  mapTo,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { HttpResponseCode } from '@crc/shared';

import { AuthService, AuthStorage } from '../../services';
import { AuthFacade } from '../../facade';
import { AuthState } from '../../entity';
import { SignedInFeatureState } from '../state';
import { accountActions, authActions } from '../actions';

@Injectable()
export class AccountEffect {
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.updateUser),
      tap((data) => {
        this.authStorageService.setLoginData(data.payload);
      }),
      map(() => accountActions.updateUserSuccess())
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.getUserInfo),
      switchMap(() => {
        const getUserInfoStream = this.authService.getUser$().pipe(
          mergeMap(({ data, code }) => {
            if (code === HttpResponseCode.OK) {
              const loginData = this.authStorageService.getLoginData();
              const payload = {
                ...JSON.parse(loginData || ''),
                ...data
              };
              this.authFacade.setLoginStatus$(AuthState.LOGGED_IN);
              return [accountActions.getUserInfoSuccess({ payload })];
            } else {
              this.authFacade.setLoginStatus$(AuthState.TOKEN_INVALID);
              return [accountActions.getUserInfoError()];
            }
          })
        );

        return getUserInfoStream.pipe(
          tap((_) => {
            this.store$.dispatch(accountActions.getUserDocument());
          })
        );
      }),
      catchError(() => of(accountActions.getUserInfoError()))
    );
  });

  getUserDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.getUserDocument),
      switchMap(() =>
        this.authService.getUserDocument().pipe(
          map(({ data, code }) => {
            if (code === HttpResponseCode.OK) {
              return accountActions.getUserDocumentSuccess({
                payload: data
              });
            } else {
              return accountActions.getUserDocumentError();
            }
          })
        )
      ),
      catchError(() => of(accountActions.getUserDocumentError()))
    );
  });

  updateBalance$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.updateBalance),
      switchMap(() => {
        // TODO switch to only update balance
        return this.authService.getUser$().pipe(
          mergeMap(({ data, code }) => {
            if (code === HttpResponseCode.OK) {
              return [accountActions.updateBalanceSuccess({ payload: data })];
            } else {
              return [accountActions.updateBalanceError()];
            }
          })
        );
      }),
      catchError(() => of(accountActions.updateBalanceError()))
    );
  });

  updateBalanceEvery5Second$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.updateBalanceEvery5Second),
      switchMap(() =>
        interval(5 * 1000).pipe(
          takeUntil(this.authFacade.getSignedOutCalled$()),
          switchMap(() => [accountActions.updateBalance()])
        )
      )
    );
  });

  findIfSessionIsAlive$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.findIfSessionAlive),
      switchMap(() => {
        return this.authService.getUser$().pipe(
          switchMap(({ code }) => {
            if (code === HttpResponseCode.OK) {
              return [
                authActions.signInSuccess(),
                accountActions.getUserInfo()
              ];
            } else {
              return [authActions.signOutSuccess()];
            }
          })
        );
      }),
      catchError(() => of(authActions.signOutSuccess()))
    );
  });

  keepSessionAliveEvery60Second$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.keepSessionAliveEvery60Second),
      switchMap(() => {
        return interval(60 * 1000).pipe(
          takeUntil(this.authFacade.getSignedOutCalled$()),
          mapTo(accountActions.keepSessionAlive())
        );
      }),
      catchError(() => of(authActions.signOut()))
    );
  });

  keepSessionAlive$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(accountActions.keepSessionAlive),
      switchMap(() => this.authService.keepSessionAlive$()),
      mergeMap(({ data, code }) => {
        if (code === HttpResponseCode.OK) {
          return [
            accountActions.updateUser({ payload: data }),
            accountActions.keepSessionAliveSuccess()
          ];
        } else {
          return [
            authActions.signOut(),
            accountActions.keepSessionAliveError()
          ];
        }
      }),
      catchError(() => [
        authActions.signOut(),
        accountActions.keepSessionAliveError()
      ])
    );
  });

  constructor(
    private readonly store$: Store<SignedInFeatureState>,
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly authFacade: AuthFacade,
    private readonly authStorageService: AuthStorage
  ) {}
}
