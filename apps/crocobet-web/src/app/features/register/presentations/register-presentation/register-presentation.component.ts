import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DateService, EMAIL_REGEXP, matchControlsValidator } from '@crc/shared';
import {
  CustomValidators,
  DocumentIdGenuine,
  Register,
  RegisterFacade
} from '@crc/facade';
import {
  selectPhoneNumber,
  selectPhoneNumberFromChild
} from '../../utils/phone-number.utils';
import { NgSelectItem } from '@crc/components';
import { addLeadingZero, phoneCodeIsGE } from '../../utils/register.functions';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  take,
  tap,
  timer
} from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentIdParamsWithPhoneNumber } from '../../entity/document-id-params-with-phone-number.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const COUNTDOWN_TIME = 60;

@UntilDestroy()
@Component({
  selector: 'crc-register-presentation',
  templateUrl: './register-presentation.component.html',
  styleUrls: ['./register-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RegisterPresentationComponent implements OnInit {
  @Input() set verificationCodeSent(status: boolean) {
    this.verificationCodeSuccess = status;
    this.cdr.markForCheck();
    this.initCountDown();
  }

  @Input() registerFailed: boolean;
  @Input() cities: NgSelectItem[];
  @Input() countries: NgSelectItem[];

  @Output() documentIdGenuine$: EventEmitter<DocumentIdParamsWithPhoneNumber>;
  @Output() resendSms$: EventEmitter<string> = new EventEmitter<string>();
  @Output() register$: EventEmitter<Register> = new EventEmitter<Register>();

  years: NgSelectItem[] = [];
  months: NgSelectItem[] = [];
  days: NgSelectItem[] = [];
  verificationCodeSuccess: boolean;
  accountDetailsForm: FormGroup;
  countDown$: Observable<number>;
  personalInfoForm: FormGroup;
  verifySmsCodeControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern(/^[0-9]+$/)
  ]);
  successBtnWidth: number;
  personalInfoFormTouched: boolean;
  disabled: boolean;

  private initCountDown() {
    this.countDown$ = timer(0, 1000).pipe(
      take(COUNTDOWN_TIME + 1),
      map((i) => COUNTDOWN_TIME - i),
      tap(
        (res) =>
          (this.successBtnWidth =
            (100 / COUNTDOWN_TIME) * (COUNTDOWN_TIME - res))
      )
    );
  }

  private formatDateOfBirth(): string {
    const year = '' + this.personalInfoForm.get('year').value;
    const month = addLeadingZero(this.personalInfoForm.get('month').value);
    const day = addLeadingZero(this.personalInfoForm.get('day').value);
    return `${year}-${month}-${day}`;
  }

  private initRegisterForms() {
    const uniqueFieldValidator = CustomValidators.createUniqueFieldValidator(
      this.registerFacade
    );

    this.accountDetailsForm = this.fb.group(
      {
        loginName: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_-]+$'),
            Validators.minLength(4),
            CustomValidators.containsValueFrom('password')
          ],
          [uniqueFieldValidator('login')]
        ),
        pinCode: new FormControl(null),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          CustomValidators.patternValidator(/\d/, { number: true }),
          CustomValidators.patternValidator(/[A-Z]/, { upperCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { lowerCase: true }),
          CustomValidators.containsValueFrom('loginName')
        ]),
        confirmPassword: new FormControl('', Validators.required),
        iAgree: new FormControl(true, Validators.requiredTrue)
      },
      {
        validators: [matchControlsValidator('password', 'confirmPassword')]
      }
    );

    this.personalInfoForm = this.fb.group({
      documentId: new FormControl(
        '',
        [Validators.required, CustomValidators.passport],
        uniqueFieldValidator('passport-number')
      ),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        CustomValidators.patternValidator(/^[a-zA-Z]{1,20}$/, {
          personalName: true
        })
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        CustomValidators.patternValidator(/^[a-zA-Z]{1,20}$/, {
          personalName: true
        })
      ]),
      day: new FormControl('1', [Validators.required]),
      month: new FormControl('1', [Validators.required]),
      year: new FormControl('1997', [Validators.required]),
      email: new FormControl(
        '',
        [
          Validators.required,
          CustomValidators.patternValidator(EMAIL_REGEXP, {
            customEmailPattern: true
          })
        ],
        uniqueFieldValidator('email')
      ),
      countryCode: new FormControl('GE', [Validators.required]),
      city: new FormControl('1', [Validators.required]),
      phoneNumber: this.fb.group({
        code: new FormControl('995', [Validators.required]),
        value: new FormControl(
          '',
          [
            Validators.required,
            CustomValidators.mobileNumberLength,
            Validators.pattern(/^[5]/),
            CustomValidators.patternValidator(/^[0-9]*$/, {
              mobileNumberPattern: true
            })
          ],
          uniqueFieldValidator('mobile', selectPhoneNumberFromChild)
        )
      }),
      freeBetSpinChoice: new FormControl('3')
    });
  }

  private initializeDates() {
    const chosenYear = parseInt(this.personalInfoForm.get('year').value, 10);
    const chosenMonth = parseInt(this.personalInfoForm.get('month').value, 10);
    const chosenDay = parseInt(this.personalInfoForm.get('day').value, 10);
    const {
      days,
      months,
      maxValidYear,
      minValidYear,
      validYear,
      maxMonthsPerYear
    } = this.dateService.getVariables();
    if (chosenYear === maxValidYear) {
      this.months = this.dateService.getAvailableMonths(months);
      if (chosenMonth === months) {
        this.days = this.dateService.getAvailableDays(
          chosenYear,
          chosenMonth,
          days
        );
      } else {
        this.days = this.dateService.getAvailableDays(chosenYear, chosenMonth);
      }
    } else if (chosenMonth > months) {
      this.years = this.dateService.getAvailableYears(validYear, minValidYear);
    } else if (chosenMonth === months && chosenDay > days) {
      this.years = this.dateService.getAvailableYears(validYear, minValidYear);
    } else {
      this.days = this.dateService.getAvailableDays(chosenYear, chosenMonth);
      this.months = this.dateService.getAvailableMonths(maxMonthsPerYear);
      this.years = this.dateService.getAvailableYears(
        maxValidYear,
        minValidYear
      );
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly registerFacade: RegisterFacade,
    private readonly dateService: DateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.documentIdGenuine$ =
      new EventEmitter<DocumentIdParamsWithPhoneNumber>();
  }

  ngOnInit() {
    this.initRegisterForms();
    this.initializeDates();
    const control: AbstractControl = this.personalInfoForm.get('city');
    this.personalInfoForm
      .get('countryCode')
      .valueChanges.pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap((value) => {
          if (value === 'GE') {
            control.patchValue('1');
            control.setValidators([Validators.required]);
          } else {
            control.reset();
            control.setValidators([
              Validators.required,
              CustomValidators.patternValidator(
                /^([A-Za-z- \s]*)$|^([ა-ჰ- \s]*)$/,
                {
                  latinOrGeorgian: true
                }
              )
            ]);
          }
          this.personalInfoForm.updateValueAndValidity();
          this.cdr.markForCheck();
        })
      )
      .subscribe();

    const phoneNumberControl: AbstractControl = this.personalInfoForm
      .get('phoneNumber')
      .get('value');

    phoneNumberControl.valueChanges
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => {
          if (!phoneNumberControl.errors) {
            this.countDown$ = undefined;
            this.successBtnWidth = undefined;
            this.cdr.markForCheck();
          }
        })
      )
      .subscribe();
  }

  onCheckDocumentId() {
    if (this.personalInfoForm.invalid || this.accountDetailsForm.invalid) {
      this.validateAllFormFields(this.personalInfoForm);
      this.validateAllFormFields(this.accountDetailsForm);
      this.personalInfoFormTouched = true;
    } else {
      const birthYear = `${new Date(
        this.personalInfoForm.get('year').value
      ).getFullYear()}`;
      const documentIdParams: DocumentIdGenuine = {
        documentNumber: this.personalInfoForm.get('documentId').value,
        birthYear
      };
      const phoneNumber = selectPhoneNumber(
        this.personalInfoForm.get('phoneNumber')
      );

      this.documentIdGenuine$.emit({ documentIdParams, phoneNumber });
    }
  }

  onResendSms() {
    const phoneNumber = selectPhoneNumber(
      this.personalInfoForm.get('phoneNumber')
    );
    this.resendSms$.emit(phoneNumber);
    this.verifySmsCodeControl.reset();
    this.initCountDown();
  }

  onRegister() {
    const phoneCode = this.personalInfoForm
      .get('phoneNumber')
      ?.get('code')?.value;
    const value: Register = {
      ...this.personalInfoForm.getRawValue(),
      ...this.accountDetailsForm.getRawValue(),
      ...(phoneCodeIsGE(phoneCode)
        ? { verificationCode: this.verifySmsCodeControl.value }
        : {}),
      address: 'test',
      phoneNumber: selectPhoneNumber(this.personalInfoForm.get('phoneNumber')),
      dateOfBirth: this.formatDateOfBirth()
    };

    this.register$.emit(value);
  }
}
