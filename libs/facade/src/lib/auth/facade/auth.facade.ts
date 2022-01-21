import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { authActions } from '../store/actions';
import { AuthService } from '../services';
import { SignedInFeatureState } from '../store/state';
import { AuthState, SignInPayload } from '../entity';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly signedOutCalled$: Subject<void> = new Subject();
  private readonly loginStatus$: BehaviorSubject<AuthState> =
    new BehaviorSubject<AuthState>(AuthState.LOGGED_OUT);

  constructor(
    private readonly authService: AuthService,
    private readonly store$: Store<SignedInFeatureState>
  ) {}

  signIn(payload: SignInPayload) {
    this.store$.dispatch(authActions.signIn({ payload }));
  }

  signOut() {
    this.store$.dispatch(authActions.signOut());
    this.signedOutCalled$.next();
  }

  getSignedOutCalled$(): Subject<void> {
    return this.signedOutCalled$;
  }

  getLoginStatus$(): Observable<AuthState> {
    return this.loginStatus$.asObservable();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.getLoginStatus$().pipe(
      map((status) => status === AuthState.LOGGED_IN)
    );
  }

  getIsLoggedIn(): boolean {
    return this.getLoginStatus() === AuthState.LOGGED_IN;
  }

  getLoginStatus(): AuthState {
    return this.loginStatus$.getValue();
  }

  setLoginStatus$(status: AuthState) {
    this.loginStatus$.next(status);
  }
}
