import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  BankProvider,
  BankProvidersData,
  CreditCardTypeByProvider,
  DepositFacade,
  PaymentForm,
  PaymentFormCard,
  PaymentProviders,
  PaymentRequestObj,
  PaymentStep
} from '@crc/facade';
import { mergeMap, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crc-w-deposit-popup-container',
  templateUrl: './deposit-popup-container.component.html',
  styleUrls: ['./deposit-popup-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class DepositPopupContainerComponent {
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  @Input() paymentAmount: number;

  iframeUrl: string;
  providerList$: Observable<BankProvider[]>;
  currentLanguage$: Observable<string> = this.depositFacade.currentLanguage$;
  paymentStep: PaymentStep;

  constructor(
    private readonly depositFacade: DepositFacade,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.providerList$ = this.depositFacade.getBankProviders().pipe(
      map(this.handleProviderListResponse),
      map((items) => items.reverse())
    );
  }

  @Input() set paymentObj(paymentObj: PaymentForm) {
    if (paymentObj && paymentObj.providerId) {
      this.paymentStep = 'externalForm';
      this.onProcessPayment(paymentObj, true);
    } else {
      this.paymentStep = 'internalForm';
    }
  }

  onProcessPayment(paymentForm: PaymentForm, saveCard?: boolean) {
    const form = paymentForm;
    const PAYMENT_CALLBACK_URL =
      'https://www.crocobet.com/#/profile/manage-money/deposit?error=false';

    const requestBody: PaymentFormCard = {
      card: {}
    };

    if (saveCard) {
      if (
        form.providerId === CreditCardTypeByProvider.BANK_OF_GEORGIA_DEPOSIT
      ) {
        requestBody.accountId = form.creditCardId;
      } else {
        requestBody.card.creditCardId = form.creditCardId;
      }
    } else {
      requestBody.card.activeCard = form.activateCard;
    }

    const paymentRequestObj: PaymentRequestObj = {
      ...requestBody,
      providerId: PaymentProviders[form.providerId],
      transactionAmount: form.transactionAmount,
      transactionCurrency: 'GEL',
      callbackUrl:
        PaymentProviders[form.providerId] === PaymentProviders.BOG_DEPOSIT
          ? PAYMENT_CALLBACK_URL.replace('#', '%23')
          : PAYMENT_CALLBACK_URL
    };

    this.makePaymentRequest(paymentRequestObj);
  }

  handleProviderListResponse(response: BankProvidersData[]) {
    const result: BankProvider[] = [];
    for (const provider of response) {
      switch (provider.providerId) {
        case PaymentProviders.TBC_DEPOSIT:
          result[1] = {
            key: PaymentProviders.BY_KEY.TBC_DEPOSIT,
            logo: 'TBC',
            minAmount: provider.limits.minAmount,
            maxTotalAmountOnAttempts: provider.limits.maxTotalAmountOnAttempts
          };
          break;
        case PaymentProviders.BOG_DEPOSIT:
          result[2] = {
            key: PaymentProviders.BY_KEY.BOG_DEPOSIT,
            logo: 'BOG',
            minAmount: provider.limits.minAmount,
            maxTotalAmountOnAttempts: provider.limits.maxTotalAmountOnAttempts
          };
          result[0] = {
            key: PaymentProviders.BY_KEY.ANY_DEPOSIT,
            logo: 'ANY',
            minAmount: provider.limits.minAmount,
            maxTotalAmountOnAttempts: provider.limits.maxTotalAmountOnAttempts
          };
          break;
      }
    }

    return result;
  }

  onPopupClose() {
    this.closePopup.emit();
  }

  private makePaymentRequest(paymentRequestObj: PaymentRequestObj) {
    this.depositFacade
      .initialPaymentRequest(paymentRequestObj)
      .pipe(
        untilDestroyed(this),
        mergeMap((response) => {
          if (response['externalRequestUrl']) {
            return of(response);
          } else {
            return this.depositFacade.processPaymentRequest(paymentRequestObj);
          }
        })
      )
      .subscribe((response) => {
        if (response?.externalRequestUrl) {
          this.iframeUrl = response.externalRequestUrl;
        } else if (response?.externalRequestForm) {
          this.iframeUrl = `https://ecommerce.ufc.ge/ecomm2/ClientHandler?trans_id=${response.remoteTransactionId}`;
        }
        this.paymentStep = 'internalForm';
        this.cdr.markForCheck();
      });
  }
}
