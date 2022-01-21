import { ChangeDetectorRef, Directive } from '@angular/core';
import { concatMap, delay, interval, tap } from 'rxjs';
import {
  AccountFacade,
  CompleteData,
  MessageCodes,
  ResultModel,
  stateLinks,
  VerificationService,
  VerificationStatus,
  VerificationType
} from '@crc/facade';
import { untilDestroyed } from '@ngneat/until-destroy';
import { LanguageStorage } from '@crc/shared';

@Directive()
export class VerificationBaseComponent {
  private readonly intervalTime = 60000 * 5;

  loading = true;
  iframeSrc: string;
  iframeHeight: number;
  tokenId: string;

  protected initializeBegin(verificationType: VerificationType) {
    this.verificationService
      .getTokenId$()
      .pipe(
        tap((token) => {
          this.iframeSrc = `https://widget.identomat.com?session_token=${token}`;
          this.tokenId = token;
          this.cdr.markForCheck();
        }),
        delay(500),
        tap((_) => (this.loading = false))
      )
      .subscribe();
    this.verificationService.getIdentomatToken(verificationType);
  }

  protected filterMessages(
    event: Record<string, any>,
    verificationType: VerificationType
  ) {
    const { height, code } = event.data;
    if (height) {
      this.iframeHeight = height;
    } else if (code === MessageCodes.tryAgain) {
      this.initializeBegin(verificationType);
    } else if (code === MessageCodes.resizeHeight) {
      this.iframeHeight = height;
    }
    this.cdr.markForCheck();
  }

  protected completeVerification() {
    this.verificationService
      .completeVerification$()
      .pipe(
        tap(({ data }) => {
          if (data) {
            this.redirectToStatus(data.result);
          }
        })
      )
      .subscribe();
  }

  protected redirectToStatus(status: CompleteData['result']) {
    if (status === ResultModel.manualCheck) {
      this.iframeSrc =
        stateLinks.pending + `/?lang=${this.languageStorage.getLang()}`;
      this.subscribeToVerificationStatus();
    } else if (status === ResultModel.rejected) {
      this.iframeSrc =
        stateLinks.error + `/?lang=${this.languageStorage.getLang()}`;
    } else if (status === ResultModel.approved) {
      this.iframeSrc =
        stateLinks.success + `/?lang=${this.languageStorage.getLang()}`;
    }
    this.cdr.markForCheck();
  }

  protected subscribeToVerificationStatus() {
    const interval$ = interval(this.intervalTime);
    const intervalSub = interval$
      .pipe(
        untilDestroyed(this),
        tap(() => this.verificationService.getVerificationStatus()),
        delay(5000),
        concatMap(() => this.accountFacade.verificationStatus$),
        tap((status) => {
          if (
            status === VerificationStatus.REJECTED ||
            status === VerificationStatus.UNVERIFIED
          ) {
            this.iframeSrc =
              stateLinks.error + `/?lang=${this.languageStorage.getLang()}`;
          } else if (status === VerificationStatus.VERIFIED) {
            this.iframeSrc =
              stateLinks.success + `/?lang=${this.languageStorage.getLang()}`;
          }
          this.cdr.markForCheck();
        })
      )
      .subscribe(() => {
        intervalSub.unsubscribe();
      });
  }

  constructor(
    private readonly verificationService: VerificationService,
    private readonly accountFacade: AccountFacade,
    private readonly languageStorage: LanguageStorage,
    private readonly cdr: ChangeDetectorRef
  ) {}
}
