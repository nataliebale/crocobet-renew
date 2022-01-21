import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardFacade {
  private readonly loginAttemptResult$ = new Subject<boolean>();
  private readonly showAuthModal$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private closeLoginModal() {
    this.showAuthModal$.next(false);
  }

  getShowLoginModal$(): Observable<boolean> {
    return this.showAuthModal$.asObservable();
  }

  getShowLoginModal(): boolean {
    return this.showAuthModal$.getValue();
  }

  openLoginModal() {
    this.showAuthModal$.next(true);
  }

  getLoginResult$() {
    return this.loginAttemptResult$.asObservable();
  }

  loginSuccess() {
    this.loginAttemptResult$.next(true);
    this.closeLoginModal();
  }

  loginCancel() {
    this.loginAttemptResult$.next(false);
    this.closeLoginModal();
  }
}
