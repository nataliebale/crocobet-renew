import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ResetPassword, ResetPasswordVerify } from '@crc/facade';
import { ResetPasswordSteps } from '@crc/shared';

@Component({
  selector: 'crc-w-reset-password-presentation',
  templateUrl: './reset-password-presentation.component.html',
  styleUrls: ['./reset-password-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPresentationComponent {
  @Input() activeDialogView: ResetPasswordSteps;
  @Output() resetPassword$: EventEmitter<ResetPassword> =
    new EventEmitter<ResetPassword>();
  @Output() resetPasswordVerify$: EventEmitter<ResetPasswordVerify> =
    new EventEmitter<ResetPasswordVerify>();
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  ResetPasswordSteps = ResetPasswordSteps;

  onResetPasswordRequest(body: ResetPassword) {
    this.resetPassword$.emit(body);
  }

  onResetPasswordVerifyRequest(body: ResetPasswordVerify) {
    this.resetPasswordVerify$.emit(body);
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }
}
