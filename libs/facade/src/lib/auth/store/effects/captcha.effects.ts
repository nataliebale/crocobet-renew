import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpResponseCode } from '@crc/shared';

import { AuthService } from '../../services';
import { captchaActions } from '../actions';
import { CaptchaCheckResponse } from '../../entity';

@Injectable()
export class CaptchaEffects {
  resetCaptchaCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(captchaActions.resetCaptchaCode),
      switchMap(({ payload }) => {
        return this.authService.resetCaptchaCode$(payload || '').pipe(
          mergeMap(({ data }) => {
            return [
              captchaActions.resetCaptchaCodeSuccess(),
              captchaActions.updateCaptchaCode({ payload: data.captcha })
            ];
          }),
          catchError(() => of(captchaActions.resetCaptchaCodeError()))
        );
      })
    );
  });

  checkCaptchaValidity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(captchaActions.checkCaptchaValidity),
      switchMap(({ payload }) => {
        return this.authService.checkCaptchaValidity$(payload).pipe(
          map((response: CaptchaCheckResponse) => {
            if (response?.code === HttpResponseCode.OK) {
              return captchaActions.checkCaptchaValiditySuccess({
                payload: response.data
              });
            }
            return captchaActions.checkCaptchaValiditySuccess({
              payload: false
            });
          })
        );
      }),
      catchError(() =>
        of(captchaActions.checkCaptchaValiditySuccess({ payload: false }))
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
