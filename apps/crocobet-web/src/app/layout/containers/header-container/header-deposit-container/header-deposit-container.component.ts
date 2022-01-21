import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountFacade, PersonalData, VerificationStatus } from '@crc/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'crc-header-deposit-container',
  templateUrl: './header-deposit-container.component.html',
  styleUrls: ['./header-deposit-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDepositContainerComponent {
  personalData$: Observable<PersonalData> = this.accountFacade.personalData$;
  verificationStatus$: Observable<VerificationStatus | undefined> =
    this.accountFacade.verificationStatus$;

  constructor(private readonly accountFacade: AccountFacade) {}
}
