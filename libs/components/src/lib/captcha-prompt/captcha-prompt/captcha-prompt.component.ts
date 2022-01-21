import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CaptchaValidationPattern } from './entity/constants/captcha-validation-pattern';

@UntilDestroy()
@Component({
  selector: 'crc-shared-captcha-prompt',
  templateUrl: './captcha-prompt.component.html',
  styleUrls: ['./captcha-prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptchaPromptComponent implements OnInit {
  @Input() set captcha(captcha: string) {
    this.captchaSafe = this.sanitizer.bypassSecurityTrustHtml(captcha);
  }

  @Input() enteredCaptchaValid: boolean;

  @Output() captchaValidValueEntered$: EventEmitter<string> =
    new EventEmitter();
  @Output() captchaValueEntered$: EventEmitter<string> = new EventEmitter();
  @Output() captchaUpdated$: EventEmitter<void> = new EventEmitter();
  @Output() captchaClosed$: EventEmitter<void> = new EventEmitter();

  form: FormGroup;
  captchaSafe: SafeHtml;
  dropdownVisible = true;
  captchaUpdateRequested: boolean;

  private generateForm() {
    const validators: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern(CaptchaValidationPattern)
    ];
    this.form = this.fb.group({
      captcha: new FormControl('', validators)
    });
  }

  private subscribeToFormValueChanges() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((form) => {
          if (this.form.valid) {
            this.captchaValueEntered$.emit(form.captcha);
            this.captchaUpdateRequested = false;
          } else {
            this.captchaUpdateRequested = true;
          }
          this.cdr.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly sanitizer: DomSanitizer,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.generateForm();
  }

  ngOnInit() {
    this.subscribeToFormValueChanges();
  }

  onSubmit() {
    const { captcha } = this.form.value;
    this.captchaValidValueEntered$.emit(captcha);
  }

  onCloseDropdown() {
    this.dropdownVisible = false;
    this.captchaClosed$.emit();
  }

  onCaptchaUpdated() {
    this.captchaUpdated$.emit();
    this.captchaUpdateRequested = true;
    this.cdr.markForCheck();
  }
}
