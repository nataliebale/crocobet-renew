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
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CustomValidators, RecoveryPassword } from '@crc/facade';
import { matchControlsValidator } from '@crc/shared';

@UntilDestroy()
@Component({
  selector: 'crc-w-recovery-password-dialog-presentation',
  templateUrl: './change-password-dialog-presentation.component.html',
  styleUrls: ['./change-password-dialog-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordDialogPresentationComponent {
  @Input() customerId: string;
  @Input() showIncorrectPasswordErrorMessage: boolean;
  @Input() userName: string;

  @Output() showIncorrectPasswordErrorMessageChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() recoveryPassword$: EventEmitter<RecoveryPassword> =
    new EventEmitter<RecoveryPassword>();
  form: FormGroup;
  submitted: boolean;
  userNameAndPasswordDoesntMatch: boolean;

  private getFormControl(name): AbstractControl {
    return this.form.get(name);
  }

  constructor(fb: FormBuilder) {
    const passwordValidations: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      CustomValidators.patternValidator(/\d/, { number: true }),
      CustomValidators.patternValidator(/[A-Z]/, { upperCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { lowerCase: true })
    ];
    this.form = fb.group(
      {
        newValue: new FormControl('', passwordValidations),
        oldValue: new FormControl('', Validators.required),
        confirmNewValue: new FormControl('', Validators.required)
      },
      {
        validators: [matchControlsValidator('newValue', 'confirmNewValue')]
      }
    );

    this.getFormControl('oldValue')
      .valueChanges.pipe(
        untilDestroyed(this),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          if (this.showIncorrectPasswordErrorMessage) {
            this.showIncorrectPasswordErrorMessageChange.emit(undefined);
          }
        })
      )
      .subscribe();

    this.getFormControl('newValue')
      .valueChanges.pipe(
        untilDestroyed(this),
        debounceTime(300),
        distinctUntilChanged(),
        tap((value) => {
          this.userNameAndPasswordDoesntMatch =
            value.length &&
            !value.includes(this.userName) &&
            !this.userName.includes(value);
        })
      )
      .subscribe();
  }

  controlIsValid(controlName: string): boolean {
    const control = this.getFormControl(controlName);
    return this.getControlDirtyAndTouched(controlName) && control.valid;
  }

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

  getControlDirtyAndTouched(controlName): boolean {
    return (
      this.getFormControl(controlName).dirty &&
      this.getFormControl(controlName).touched
    );
  }

  onSubmit() {
    this.submitted = true;
    const body: RecoveryPassword = {
      customerId: this.customerId,
      newValue: this.getFormControl('newValue').value,
      oldValue: this.getFormControl('oldValue').value,
      valueName: 'password'
    };
    this.recoveryPassword$.emit(body);
  }
}
