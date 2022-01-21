import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  PersonalData,
  PersonalInfoFacade,
  SecurityOptions,
  UserSubscriptionsModel,
  VerificationStatus
} from '@crc/facade';
import { NgSelectItem } from '@crc/components';

@Component({
  selector: 'crc-w-personal-info-presentation',
  templateUrl: './personal-info-presentation.component.html',
  styleUrls: ['./personal-info-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoPresentationComponent {
  @Input() verificationStatus: VerificationStatus | undefined;
  @Input() personalData: PersonalData;
  @Input() security: SecurityOptions;
  @Input() cities: NgSelectItem[];
  @Input() countries: NgSelectItem[];

  @Output() securityOptionModel: EventEmitter<SecurityOptions> =
    new EventEmitter<SecurityOptions>();

  @Output() openPasswordRecovery: EventEmitter<void> = new EventEmitter<void>();

  UserSubscriptionModel = UserSubscriptionsModel;

  constructor(private readonly personalInfoFacade: PersonalInfoFacade) {}

  onSetSecurityOptions(event) {
    this.securityOptionModel.emit(event);
    this.personalInfoFacade.updateSubscriptions(this.security);
  }
}
