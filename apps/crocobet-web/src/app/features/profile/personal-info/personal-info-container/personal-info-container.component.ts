import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import {
  AccountFacade,
  AuthFacade,
  PersonalData,
  PersonalInfoFacade,
  RecoveryPassword,
  SecurityOptions,
  VerificationStatus
} from '@crc/facade';
import { Observable, startWith, tap } from 'rxjs';
import { RecoveryPasswordResponse, RecoveryPasswordSteps } from '@crc/shared';
import { NgSelectItem } from '@crc/components';
import { DictionaryDataService } from '../../../../core/services/dictionary-data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'crc-w-personal-info-container',
  templateUrl: './personal-info-container.component.html',
  styleUrls: ['./personal-info-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoContainerComponent implements OnInit {
  personalData$: Observable<PersonalData> = this.accountFacade.personalData$;
  verificationStatus$: Observable<VerificationStatus | undefined>;
  security$: Observable<SecurityOptions>;
  customerId$: Observable<string>;
  showPasswordRecoveryDialog = false;
  activeDialogView: RecoveryPasswordSteps = 1;
  RecoveryPasswordSteps = RecoveryPasswordSteps;
  showIncorrectPasswordErrorMessage: boolean;
  countries: NgSelectItem[] = [];
  cities: NgSelectItem[] = [];
  userName$: Observable<string> = this.accountFacade.userName$;

  constructor(
    private readonly accountFacade: AccountFacade,
    private readonly authFacade: AuthFacade,
    private readonly personalInfoFacade: PersonalInfoFacade,
    private readonly cdr: ChangeDetectorRef,
    private readonly dictionaryDataService: DictionaryDataService
  ) {
    this.verificationStatus$ = this.accountFacade.verificationStatus$;
    this.security$ = this.personalInfoFacade.security$.pipe(
      startWith({ smsLogin: false, smsWonBet: false })
    );
    this.customerId$ = this.accountFacade.pinCode$;
  }

  ngOnInit() {
    this.dictionaryDataService
      .getDataLoaded$()
      .pipe(
        untilDestroyed(this),
        tap((status: boolean) => {
          if (status) {
            this.cities = window['dictionaryData'].cities;
            this.countries = window['dictionaryData'].countries;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  setSecurityOptions(option) {
    this.security$[option] = !this.security$[option];
  }

  onClosePasswordRecoveryDialog() {
    this.showPasswordRecoveryDialog = false;
    this.showIncorrectPasswordErrorMessage = false;
    if (this.activeDialogView === RecoveryPasswordSteps.SUCCESS) {
      this.authFacade.signOut();
    }
    this.activeDialogView = RecoveryPasswordSteps.ENTER_DETAILS;
    this.cdr.markForCheck();
  }

  onRecoveryPassword(body: RecoveryPassword) {
    this.accountFacade
      .recoveryPassword(body)
      .pipe(
        tap((res: RecoveryPasswordResponse) => {
          if (res === RecoveryPasswordResponse.SUCCESS) {
            this.activeDialogView = RecoveryPasswordSteps.SUCCESS;
          } else if (res === RecoveryPasswordResponse.FAIL) {
            this.activeDialogView = RecoveryPasswordSteps.FAIL;
          } else if (res === RecoveryPasswordResponse.OLD_PASSWORD_INCORRECT) {
            this.showIncorrectPasswordErrorMessage = true;
          }

          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }
}
