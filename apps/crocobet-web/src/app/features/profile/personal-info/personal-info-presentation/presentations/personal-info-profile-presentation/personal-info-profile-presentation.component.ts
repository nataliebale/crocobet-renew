import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PersonalData, VerificationStatus } from '@crc/facade';

@Component({
  selector: 'crc-w-personal-info-profile-presentation',
  templateUrl: './personal-info-profile-presentation.component.html',
  styleUrls: ['./personal-info-profile-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoProfilePresentationComponent {
  @Input() verificationStatus: VerificationStatus | undefined;
  @Input() personalData: PersonalData;
  showTooltip = false;

  VerificationStatus = VerificationStatus;
}
