import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AccountFacade,
  VerificationFacade,
  VerificationNavItem,
  VerificationStatus
} from '@crc/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'crc-w-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationComponent {
  verificationNav: VerificationNavItem[];
  verificationStatus$: Observable<VerificationStatus>;
  userName$: Observable<string>;
  pinCode$: Observable<string>;
  VerificationStatus = VerificationStatus;

  constructor(
    accountFacade: AccountFacade,
    verificationFacade: VerificationFacade
  ) {
    this.verificationNav = verificationFacade.getVerificationNav();
    this.verificationStatus$ = accountFacade.verificationStatus$;
    this.userName$ = accountFacade.userName$;
    this.pinCode$ = accountFacade.pinCode$;
  }
}
