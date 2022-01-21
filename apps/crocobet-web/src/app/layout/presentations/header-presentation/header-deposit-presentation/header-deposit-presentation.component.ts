import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonalData, VerificationStatus } from '@crc/facade';

@Component({
  selector: 'crc-header-deposit-presentation',
  templateUrl: './header-deposit-presentation.component.html',
  styleUrls: ['./header-deposit-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDepositPresentationComponent {
  @Input() personalData: PersonalData;
  @Input() verificationStatus: VerificationStatus | undefined;

  VerificationStatus = VerificationStatus;
  isPopupVisible = false;

  onFastDepositPopupClose() {
    this.isPopupVisible = false;
  }

  onDepositPopupClose() {
    this.isPopupVisible = false;
  }
}
