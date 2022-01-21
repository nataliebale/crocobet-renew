import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  selector: 'crc-w-login-in-popup-container',
  templateUrl: './login-in-popup-container.component.html',
  styleUrls: ['./login-in-popup-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginInPopupContainerComponent {
  isLoggedIn$: Observable<AuthState> = this.authFacade.getLoginStatus$();
  showAuthModal$: Observable<boolean> =
    this.loginGuardFacade.getShowLoginModal$();

  captchaCode$: Observable<string> = this.captchaFacade.captchaCode$;
  enteredCaptchaValid$: Observable<boolean> =
    this.captchaFacade.isCaptchaCheckedSuccess;

  constructor(
    private readonly loginGuardFacade: LoginGuardFacade,
    private readonly authFacade: AuthFacade,
    private readonly captchaFacade: CaptchaFacade,
    private readonly resetPasswordFacade: ResetPasswordFacade,
    private readonly router: Router
  ) {}

  onCaptchaClose() {
    this.captchaFacade.closeCaptchaModal();
  }

  onCloseAuthModal() {
    this.onCaptchaClose();
    this.loginGuardFacade.loginCancel();
  }

  onResetPassword() {
    this.loginGuardFacade.loginCancel();
    this.resetPasswordFacade.showResetPassword();
  }

  onRegister() {
    this.router.navigateByUrl('register').then();
    this.loginGuardFacade.loginCancel();
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
