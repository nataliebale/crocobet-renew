import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { AccountFacade, VerificationService } from '@crc/facade';
import { UntilDestroy } from '@ngneat/until-destroy';
import { LanguageStorage } from '@crc/shared';
import { VerificationBaseComponent } from '../../verification-base.component';

@UntilDestroy()
@Component({
  selector: 'crc-w-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveComponent extends VerificationBaseComponent implements OnInit {
  @HostListener('window:message', ['$event'])
  private message(event: MessageEvent) {
    this.filterMessages(event, 'liveness');
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

  ngOnInit() {
    this.initializeBegin('liveness');
  }
}
