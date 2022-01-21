import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  AuthFacade,
  DocumentIdGenuine,
  Register,
  RegisterFacade,
  SignInPayload
} from '@crc/facade';
import { of, switchMap, tap } from 'rxjs';
import { NgSelectItem } from '@crc/components';
import { appendCountryFlag, sortFn } from '../../utils/register.functions';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DictionaryDataService } from '../../../../core/services/dictionary-data.service';

@UntilDestroy()
@Component({
  selector: 'crc-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContainerComponent implements OnInit {
  private signInPayload: SignInPayload;

  verificationCodeSent: boolean;
  countries: NgSelectItem[] = [];
  cities: NgSelectItem[] = [];
  registerSuccess: boolean;
  showDialog: boolean;

  private extractDropDownsData(data) {
    const nonEmpty = (obj) =>
      Object.entries(obj)
        .filter(([key, value]) => key && value)
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});

    const formatLocations = (
      obj: Record<string, any>,
      sortFn
    ): NgSelectItem[] => {
      const rawLocations = nonEmpty({ ...obj });
      return Object.entries(rawLocations)
        .map(([key, value], index) => ({ key, value, id: index + 1 }))
        .sort(sortFn);
    };

    const sortCountriesFn = sortFn((a) => a.value);
    this.countries = formatLocations(data.countries, sortCountriesFn).map(
      (item) => appendCountryFlag(item, (countryCode) => countryCode + '.svg')
    );

    const sortCitiesFn = sortFn((a) => Number(a.key));
    this.cities = formatLocations(data.cities, sortCitiesFn);
    this.cdr.markForCheck();
  }

  private closeDialog() {
    this.showDialog = false;
  }

  constructor(
    private readonly registerFacade: RegisterFacade,
    private readonly authFacade: AuthFacade,
    private readonly dictionaryDataService: DictionaryDataService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dictionaryDataService
      .getDataLoaded$()
      .pipe(
        untilDestroyed(this),
        tap((status: boolean) => {
          if (status) {
            const data = window['dictionaryData'];
            this.extractDropDownsData(data);
          }
        })
      )
      .subscribe();
  }

  onDocumentIdGenuine(body: DocumentIdGenuine, phoneNumber: string) {
    this.registerFacade
      .isDocumentIdGenuine$(body)
      .pipe(
        untilDestroyed(this),
        switchMap((res: boolean) => {
          return res
            ? this.registerFacade.sendVerificationCode$(phoneNumber)
            : of(false);
        }),
        tap((res: boolean) => {
          this.verificationCodeSent = res;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  onResendVerificationCode(phoneNumber: string) {
    this.registerFacade
      .sendVerificationCode$(phoneNumber)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onRegister(registerBody: Register) {
    this.registerFacade
      .register$(registerBody)
      .pipe(
        untilDestroyed(this),
        tap((res) => {
          this.registerSuccess = res;
          if (res) {
            this.signInPayload = {
              login: registerBody.loginName,
              password: registerBody.password
            };

            this.showDialog = true;
          }
        })
      )
      .subscribe();
  }

  onVerify() {
    this.authFacade.signIn(this.signInPayload);
    this.authFacade
      .isLoggedIn$()
      .pipe(
        untilDestroyed(this),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigateByUrl('profile/verification');
            this.closeDialog();
          }
        })
      )
      .subscribe();
  }
}
