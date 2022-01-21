import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '../facade';
import { AuthState } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuard implements CanActivate {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean> {
    return this.authFacade.getLoginStatus$().pipe(
      map((authState) => authState !== AuthState.LOGGED_IN),
      tap((isVisitor) => {
        if (!isVisitor) {
          this.router.navigateByUrl('/').then();
        }
      })
    );
  }
}
