import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ResetPassword } from '@crc/facade';

@Component({
  selector: 'crc-w-reset-password-enter-phone-number-presentation',
  templateUrl: './reset-password-phone-presentation.component.html',
  styleUrls: ['./reset-password-phone-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPhonePresentationComponent {
  @Output() submit$: EventEmitter<ResetPassword> =
    new EventEmitter<ResetPassword>();
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[5]/)
      ])
    });
  }

  onSubmit() {
    this.submit$.emit(this.form.value);
  }
}
