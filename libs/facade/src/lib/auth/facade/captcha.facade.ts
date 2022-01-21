import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EnteredCaptchaModel } from '../entity';
import { SignedInFeatureState } from '../store/state';
import { captchaActions } from '../store/actions';
import { captchaSelectors } from '../store/selectors';

@Injectable({ providedIn: 'root' })
export class CaptchaFacade {
  readonly captchaCode$: Observable<string | undefined> = this.store$.select(
    captchaSelectors.getCaptchaCode
  );

  readonly isCaptchaCheckedSuccess: Observable<boolean | undefined> =
    this.store$.select(captchaSelectors.getCheckedCaptchaSuccess);

  constructor(private readonly store$: Store<SignedInFeatureState>) {}

  closeCaptchaModal() {
    this.store$.dispatch(captchaActions.closeCaptchaModal());
  }

  updateCaptchaCode(loginName: string) {
    this.store$.dispatch(
      captchaActions.resetCaptchaCode({ payload: loginName })
    );
  }

  checkCaptchaValidity(payload: EnteredCaptchaModel) {
    this.store$.dispatch(captchaActions.checkCaptchaValidity({ payload }));
  }
}
