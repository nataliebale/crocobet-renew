import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthState, EnteredCaptchaModel, SignInPayload } from '../entity';

@Directive()
export class LoginBaseComponent implements OnChanges {
  @Input() captcha!: string;
  @Input() enteredCaptchaValid!: boolean;
  @Input() loginPopupShowState!: boolean;
  @Input() set isLoggedIn(isLoggedIn: AuthState) {
    this.loginFailed = isLoggedIn === AuthState.LOGIN_FAILED;
    this.cdr.markForCheck();
  }

  @Output() checkCaptchaValidity$: EventEmitter<EnteredCaptchaModel> =
    new EventEmitter();
  @Output() captchaUpdated$: EventEmitter<string> = new EventEmitter();
  @Output() captchaClosed$: EventEmitter<void> = new EventEmitter();
  @Output() signIn$: EventEmitter<SignInPayload> = new EventEmitter();
  @Output() resetPassword$: EventEmitter<void> = new EventEmitter();

  submitted!: boolean;
  loginFailed!: boolean;
  form!: FormGroup;
  passwordC = new FormControl('', Validators.required);
  usernameC = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_-]+$')
  ]);

  private resetCaptchaControl() {
    const control: AbstractControl | null = this.form.get('captcha');
    control?.reset();
    control?.removeValidators(Validators.required);
    control?.updateValueAndValidity();
  }

  private reset() {
    this.form.reset();
    this.submitted = false;
    this.loginFailed = false;
    this.cdr.markForCheck();
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.form = fb.group({
      login: this.usernameC,
      password: this.passwordC,
      captcha: new FormControl('')
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loginPopupShowState) {
      if (this.loginPopupShowState) {
        this.reset();
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.captcha?.length) {
        this.resetCaptchaControl();
      }
      const signInPayload: SignInPayload = this.form.value;
      this.signIn$.emit(signInPayload);
      const { captcha } = this.form.value;
      if (captcha) {
        this.onCaptchaClosed();
      }
    }
    this.submitted = true;
    this.cdr.markForCheck();
  }

  onEnterCaptchaValidValue(captcha: string) {
    const control: AbstractControl | null = this.form.get('captcha');
    control?.patchValue(captcha);
    control?.addValidators(Validators.required);
    this.form.updateValueAndValidity();
    this.onSubmit();
  }

  onCaptchaClosed() {
    this.captchaClosed$.emit();
  }

  onCaptchaUpdated() {
    const { login } = this.form.value;
    this.captchaUpdated$.emit(login);
  }

  onCheckCaptchaValidity(captcha: string) {
    const payload: EnteredCaptchaModel = {
      login: this.form.get('login')?.value,
      captcha
    };
    this.form.get('captcha')?.patchValue(captcha);
    this.form.updateValueAndValidity();
    this.checkCaptchaValidity$.emit(payload);
  }

  onResetPassword() {
    this.reset();
    this.onCaptchaClosed();
    this.resetPassword$.emit();
  }
}
