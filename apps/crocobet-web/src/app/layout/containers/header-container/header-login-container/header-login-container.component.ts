import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AuthFacade,
  AuthState,
  CaptchaFacade,
  EnteredCaptchaModel,
  LoginGuardFacade,
  ResetPasswordFacade,
  SignInPayload
} from '@crc/facade';

@Component({
  selector: 'crc-w-header-login-container',
  templateUrl: './header-login-container.component.html',
  styleUrls: ['./header-login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLoginContainerComponent {
  isLoggedIn$: Observable<AuthState> = this.authFacade.getLoginStatus$();
  showAuthModal$: Observable<boolean> =
    this.loginGuardFacade.getShowLoginModal$();

  captchaCode$: Observable<string> = this.captchaFacade.captchaCode$;
  enteredCaptchaValid$: Observable<boolean> =
    this.captchaFacade.isCaptchaCheckedSuccess;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly captchaFacade: CaptchaFacade,
    private readonly resetPasswordFacade: ResetPasswordFacade
  ) {}

  onCaptchaClose() {
    this.captchaFacade.closeCaptchaModal();
  }

  onResetPassword() {
    this.resetPasswordFacade.showResetPassword();
  }

  onSignIn(payload: SignInPayload) {
    this.authFacade.signIn(payload);
  }

  onCaptchaUpdated(loginName: string) {
    this.captchaFacade.updateCaptchaCode(loginName);
  }

  onCheckCaptchaValidity(payload: EnteredCaptchaModel) {
    this.captchaFacade.checkCaptchaValidity(payload);
  }
}
