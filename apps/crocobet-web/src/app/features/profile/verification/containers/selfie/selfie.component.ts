import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { AccountFacade, VerificationService } from '@crc/facade';
import { LanguageStorage } from '@crc/shared';
import { VerificationBaseComponent } from '../../verification-base.component';

@Component({
  selector: 'crc-w-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelfieComponent
  extends VerificationBaseComponent
  implements OnInit {
  @HostListener('window:message', ['$event'])
  private message(event: MessageEvent) {
    this.filterMessages(event, 'selfie');
    if (event.origin !== 'https://widget.identomat.com') {
      return;
    }
    if (event.data !== 'DONE') {
      return;
    }
    this.completeVerification();
  }

  constructor(
    verificationService: VerificationService,
    accountFacade: AccountFacade,
    languageStorage: LanguageStorage,
    cdr: ChangeDetectorRef
  ) {
    super(verificationService, accountFacade, languageStorage, cdr);
  }

  ngOnInit(): void {
    this.initializeBegin('selfie');
  }
}
