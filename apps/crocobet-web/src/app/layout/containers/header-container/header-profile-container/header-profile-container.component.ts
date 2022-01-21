import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, tap, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
  AccountFacade,
  AuthFacade,
  ListItem,
  PersonalData,
  UserFacade,
  VerificationStatus
} from '@crc/facade';

@UntilDestroy()
@Component({
  selector: 'crc-header-profile-container',
  templateUrl: './header-profile-container.component.html',
  styleUrls: ['./header-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfileContainerComponent {
  personalData$: Observable<PersonalData> = this.accountFacade.personalData$;
  verificationStatus$: Observable<VerificationStatus | undefined> =
    this.accountFacade.verificationStatus$;
  userMenuItems: Array<ListItem> = this.userFacade.getUserMenuItems();
  copyTooltipVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isCopyTooltipVisible$ = this.copyTooltipVisible$.asObservable();
  pinCode$: Observable<string> = this.accountFacade.pinCode$;

  constructor(
    private readonly userFacade: UserFacade,
    private readonly authFacade: AuthFacade,
    private readonly accountFacade: AccountFacade
  ) {}

  signOut() {
    this.authFacade.signOut();
  }

  isCopyTooltipVisibleChange() {
    this.copyTooltipVisible$.next(true);

    timer(2000)
      .pipe(
        tap(() => this.copyTooltipVisible$.next(false)),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
