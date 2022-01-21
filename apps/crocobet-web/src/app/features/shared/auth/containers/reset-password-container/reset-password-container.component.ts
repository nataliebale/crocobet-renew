import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import {
  ResetPassword,
  ResetPasswordFacade,
  ResetPasswordVerify
} from '@crc/facade';
import { ResetPasswordSteps } from '@crc/shared';

@UntilDestroy()
@Component({
  selector: 'crc-w-reset-password-container',
  templateUrl: './reset-password-container.component.html',
  styleUrls: ['./reset-password-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordContainerComponent {
  private mobileNumber: string;

  showPopup = this.resetPasswordFacade.getResetPasswordState$();
  activeDialogView: ResetPasswordSteps = ResetPasswordSteps.ENTER_MOBILE;

  constructor(
    private readonly resetPasswordFacade: ResetPasswordFacade,
    private readonly cdr: ChangeDetectorRef
  ) {}

  onDialogClosed() {
    this.resetPasswordFacade.closeResetPassword();
    this.activeDialogView = ResetPasswordSteps.ENTER_MOBILE;
  }

  onResetPasswordVerifyRequest(body: ResetPasswordVerify) {
    body.mobile = this.mobileNumber;
    this.resetPasswordFacade
      .resetPasswordVerify(body)
      .pipe(
        tap((status: boolean) => {
          if (status) {
            this.activeDialogView = ResetPasswordSteps.SUCCESS;
          } else {
            this.activeDialogView = ResetPasswordSteps.FAIL;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  onResetPasswordRequest(body: ResetPassword) {
    body.mobile = `995:${body.mobile}`;
    this.mobileNumber = body.mobile;
    this.resetPasswordFacade
      .resetPassword(body)
      .pipe(
        untilDestroyed(this),
        tap((status: boolean) => {
          if (status) {
            this.activeDialogView = ResetPasswordSteps.VERIFY_CODE;
          } else {
            this.activeDialogView = ResetPasswordSteps.FAIL;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }
}
