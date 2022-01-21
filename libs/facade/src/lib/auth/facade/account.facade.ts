import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, Observable } from 'rxjs';

import {
  CookieService,
  EnvironmentService,
  Language,
  LanguageFacade,
  RecoveryPasswordResponse
} from '@crc/shared';

import { SignedInFeatureState } from '../store/state';
import { AccountService, AuthStorage } from '../services';
import { accountActions } from '../store/actions';
import { accountSelectors } from '../store/selectors';
import {
  LiveCallerUser,
  PersonalData,
  RecoveryPassword,
  VerificationStatus
} from '../entity';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountFacade {
  readonly personalData$: Observable<PersonalData> = this.store$.select(
    accountSelectors.selectPersonalData
  );

  readonly verificationStatus$: Observable<VerificationStatus | undefined> =
    this.store$.select(accountSelectors.selectVerificationStatus).pipe(
      filter((v) => v !== undefined),
      distinctUntilChanged()
    );

  readonly isVerified$: Observable<boolean> = this.verificationStatus$.pipe(
    map((status) => status === VerificationStatus.VERIFIED)
  );

  readonly pinCode$: Observable<string> = this.store$.select(
    accountSelectors.selectPinCode
  );

  readonly customerId$: Observable<number> = this.store$.select(
    accountSelectors.selectCustomerId
  );

  readonly userName$: Observable<string> = this.store$.select(
    accountSelectors.selectUserName
  );

  readonly currentLanguage$: Observable<string> = this.languageService.current$;

  constructor(
    private readonly store$: Store<SignedInFeatureState>,
    private readonly cookieService: CookieService,
    private readonly environmentService: EnvironmentService,
    private readonly accountService: AccountService,
    private readonly languageService: LanguageFacade,
    private readonly authStorage: AuthStorage,
    private readonly router: Router
  ) {}

  checkIfSessionIsAlive() {
    if (this.authStorage.getLoginData()) {
      this.store$.dispatch(accountActions.findIfSessionAlive());
    }
  }

  getUserLiveCaller(body: LiveCallerUser) {
    return this.accountService.initLiveCaller(body);
  }

  recoveryPassword(
    body: RecoveryPassword
  ): Observable<RecoveryPasswordResponse> {
    return this.accountService.recoveryPassword(body);
  }

  getDataLanguage(lang: Language): Observable<string> {
    return this.accountService.getDataLanguage(lang);
  }
}
