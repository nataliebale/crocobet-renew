import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CustomValidators, ResetPasswordVerify } from '@crc/facade';
import { matchControlsValidator } from '@crc/shared';

@Component({
  selector: 'crc-w-reset-password-verify-presentation',
  templateUrl: './reset-password-confirm-presentation.component.html',
  styleUrls: ['./reset-password-confirm-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordConfirmPresentationComponent {
  @Input() mobileNumber: string;
  @Output() submit$: EventEmitter<ResetPasswordVerify> =
    new EventEmitter<ResetPasswordVerify>();

  form: FormGroup;

  private getFormControl(name): AbstractControl {
    return this.form.get(name);
  }

  constructor(fb: FormBuilder) {
    const passwordPatterns: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      CustomValidators.patternValidator(/\d/, { number: true }),
      CustomValidators.patternValidator(/[A-Z]/, { upperCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { lowerCase: true })
    ];
    this.form = fb.group(
      {
        password: new FormControl('', Validators.compose(passwordPatterns)),
        confirmPassword: new FormControl('', Validators.required),
        verificationCode: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ])
      },
      {
        validators: [matchControlsValidator('password', 'confirmPassword')]
      }
    );
  }

  onSubmit() {
    const body: ResetPasswordVerify = {
      mobile: '',
      password: this.form.get('password').value,
      verificationCode: this.form.get('verificationCode').value
    };

    this.submit$.emit(body);
  }

  // TODO refactor
  controlHasErrors(
    controlName: string,
    withoutDirtyAndTouched = false
  ): boolean | ValidationErrors {
    const control: AbstractControl = this.getFormControl(controlName);
    if (withoutDirtyAndTouched) {
      return control.errors;
    }
    return this.getControlDirtyAndTouched(controlName) && control.errors;
  }

  controlIsValid(controlName: string): boolean {
    const control = this.getFormControl(controlName);
    return this.getControlDirtyAndTouched(controlName) && control.valid;
  }

  getControlDirtyAndTouched(controlName): boolean {
    return (
      this.getFormControl(controlName).dirty &&
      this.getFormControl(controlName).touched
    );
  }
}
