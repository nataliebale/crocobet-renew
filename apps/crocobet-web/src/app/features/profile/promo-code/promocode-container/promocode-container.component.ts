import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay, merge, Observable, of, Subject, switchMap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  AccountFacade,
  CaptchaFacade,
  EnteredCaptchaModel,
  PersonalData,
  PromoCodeCheck,
  PromocodeFacade
} from '@crc/facade';

@UntilDestroy()
@Component({
  selector: 'crc-w-promocode-container',
  templateUrl: './promocode-container.component.html',
  styleUrls: ['./promocode-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromocodeContainerComponent {
  promoCode = new FormControl('');
  captchaCode$: Observable<string> = this.captchaFacade.captchaCode$;
  isEnteredCaptchaValid$: Observable<boolean> =
    this.captchaFacade.isCaptchaCheckedSuccess;
  personalData$: Observable<PersonalData> = this.accountFacade.personalData$;
  showCaptcha: boolean;

  promoCodeResult$: Observable<PromoCodeCheck>;
  $requestPromoCodeCheck = new Subject<boolean>();

  constructor(
    private readonly captchaFacade: CaptchaFacade,
    private readonly accountFacade: AccountFacade,
    private readonly promoCodeFacade: PromocodeFacade
  ) {
    this.promoCodeResult$ = this.$requestPromoCodeCheck.pipe(
      switchMap((redeem) =>
        merge(
          of({ loading: true } as PromoCodeCheck),
          redeem
            ? this.promoCodeFacade.checkPromoCode(this.promoCode.value).pipe(
                switchMap((resp) => {
                  return resp.valid
                    ? this.promoCodeFacade.redeemPromoCode(this.promoCode.value)
                    : of({ success: false } as PromoCodeCheck);
                }),
                delay(500)
              )
            : of(null as PromoCodeCheck)
        )
      )
    );
  }

  onGetCaptcha(loginName: string) {
    document.body.classList.add('overflow-hidden');
    this.onCaptchaUpdated(loginName);
  }

  onCaptchaClose() {
    document.body.classList.remove('overflow-hidden');
    this.captchaFacade.closeCaptchaModal();
  }

  onCaptchaUpdated(loginName: string) {
    this.captchaFacade.updateCaptchaCode(loginName);
  }

  onCheckCaptchaValidity(payload: EnteredCaptchaModel) {
    this.captchaFacade.checkCaptchaValidity(payload);
  }

  onSubmitCaptcha() {
    this.$requestPromoCodeCheck.next(true);
  }

  onCloseAndReset() {
    this.$requestPromoCodeCheck.next(false);
    this.captchaFacade.closeCaptchaModal();
  }
}
