import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { take } from 'rxjs/operators';

import { AccountFacade, AuthFacade, LoginGuardFacade } from '../facade';

@Injectable({
  providedIn: 'root'
})
export class NotVerifiedGuard implements CanActivate {
  constructor(
    private readonly accountFacade: AccountFacade,
    private readonly authFacade: AuthFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkIfLoginIsRequired(next);
  }

  private checkIfLoginIsRequired(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return next.data?.verification?.requireLogin
      ? this.authFacade.getIsLoggedIn()
        ? of(true)
        : this.loginGuardFacade.getLoginResult$().pipe(
            take(1),
            switchMap((loggedIn) =>
              loggedIn ? this.getIsVerified() : of(false)
            )
          )
      : of(this.authFacade.getIsLoggedIn()).pipe(
          switchMap((loggedIn) => (loggedIn ? this.getIsVerified() : of(true)))
        );
  }

  getIsVerified() {
    return this.accountFacade.isVerified$.pipe(take(1)).pipe(
      switchMap((verified) => {
        if (!verified) {
          return this.redirectToVerification();
        } else {
          return of(verified);
        }
      })
    );
  }

  redirectToVerification() {
    return this.router.navigate(['/profile/verification']);
  }
}
