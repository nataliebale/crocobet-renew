import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ListItem, PersonalData, VerificationStatus } from '@crc/facade';

@Component({
  selector: 'crc-header-profile-presentation',
  templateUrl: './header-profile-presentation.component.html',
  styleUrls: ['./header-profile-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderProfilePresentationComponent {
  @Input() userMenuItems: Array<ListItem>;
  @Input() personalData: PersonalData;
  @Input() verificationStatus: VerificationStatus;
  @Input() isCopyTooltipVisible: boolean;
  @Input() pinCode: string;

  @Output() signOut: EventEmitter<void> = new EventEmitter();
  @Output() isCopyTooltipVisibleChange: EventEmitter<void> = new EventEmitter();

  VerificationStatus = VerificationStatus;
  isPopupVisible: boolean;

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  logOut() {
    this.signOut.emit();
    this.closePopup();
  }

  showCopyTooltip() {
    this.isCopyTooltipVisibleChange.emit();
  }
}
