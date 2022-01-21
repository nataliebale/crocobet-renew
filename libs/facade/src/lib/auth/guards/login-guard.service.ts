import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthFacade, CaptchaFacade, LoginGuardFacade } from '../facade';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly captchaFacade: CaptchaFacade
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth(state);
  }

  private checkAuth(state: RouterStateSnapshot): Observable<boolean> {
    return this.authFacade.isLoggedIn$().pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.captchaFacade.closeCaptchaModal();
          this.loginGuardFacade.openLoginModal();
          return this.loginGuardFacade.getLoginResult$();
        } else {
          return of(isLoggedIn);
        }
      })
    );
  }
}
