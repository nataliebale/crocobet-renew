import { Injectable } from '@angular/core';
import { DepositService } from '../services/deposit.service';
import {
  from,
  merge,
  Observable,
  Subject,
  switchMap,
  tap,
  toArray
} from 'rxjs';
import { Deposit } from '../entity/deposit.interface';
import { DepositCardsStorage } from '../storage/deposit-cards.storage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BankProvidersData,
  PaymentProviderResponse,
  PaymentProviders,
  PaymentRequestObj
} from '../entity/payment-providers.config';
import { LanguageFacade } from '@crc/shared';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class DepositFacade {
  bogCards$: Observable<Deposit[]> = this.getBogCards();
  tbcCards$: Observable<Deposit[]> = this.getTbcCards();

  $cards = new Subject<Deposit[]>();
  cards$: Observable<Deposit[]> = this.$cards.asObservable();

  readonly currentLanguage$: Observable<string> = this.languageService.current$;

  constructor(
    private readonly depositService: DepositService,
    private readonly depositCardStorage: DepositCardsStorage,
    private readonly languageService: LanguageFacade
  ) {}

  requestCards() {
    merge(
      this.bogCards$.pipe(switchMap((cards) => from(cards))),
      this.tbcCards$.pipe(switchMap((cards) => from(cards)))
    )
      .pipe(
        untilDestroyed(this),
        toArray(),
        tap((cards) => {
          cards.unshift({} as Deposit);
          this.$cards.next(cards);
        })
      )
      .subscribe();
  }

  getBogCards(): Observable<Deposit[]> {
    return this.depositService.getCreditCards(PaymentProviders.BOG_DEPOSIT);
  }

  getTbcCards(): Observable<Deposit[]> {
    return this.depositService.getCreditCards(PaymentProviders.TBC_DEPOSIT);
  }

  updateCardName(name: string, creditCardID: number) {
    this.depositCardStorage.setCardName(name, creditCardID);
  }

  removeCardName(creditCardID: number) {
    this.depositCardStorage.removeCardName(creditCardID);
  }

  removeCreditCard(creditCardId: number): Observable<Deposit[]> {
    return this.depositService
      .removeCreditCard(creditCardId)
      .pipe(tap(() => this.requestCards()));
  }

  initialPaymentRequest(
    requestBody: PaymentRequestObj
  ): Observable<PaymentProviderResponse> {
    return this.depositService.initialPaymentRequest(requestBody);
  }

  processPaymentRequest(
    requestBody: PaymentRequestObj
  ): Observable<PaymentProviderResponse> {
    return this.depositService.processPaymentRequest(requestBody);
  }

  getBankProviders(): Observable<BankProvidersData[]> {
    return this.depositService.getBankProviders();
  }
}
