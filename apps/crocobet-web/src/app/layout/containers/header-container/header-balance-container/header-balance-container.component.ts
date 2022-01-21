import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AccountFacade,
  PersonalData,
  UserFacade,
  VerificationStatus
} from '@crc/facade';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'crc-header-balance-container',
  templateUrl: './header-balance-container.component.html',
  styleUrls: ['./header-balance-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBalanceContainerComponent implements OnInit {
  personalData$: Observable<PersonalData> = this.accountFacade.personalData$;
  verificationStatus$: Observable<VerificationStatus> =
    this.accountFacade.verificationStatus$;

  isBalanceVisible: boolean;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly accountFacade: AccountFacade
  ) {}

  ngOnInit() {
    this.getToggleBalanceState();
  }

  getToggleBalanceState() {
    this.isBalanceVisible = this.userFacade.getToggleBalanceState();
  }

  toggleBalance() {
    this.isBalanceVisible = !this.isBalanceVisible;
    this.userFacade.setToggleBalanceState(this.isBalanceVisible);
  }
}
