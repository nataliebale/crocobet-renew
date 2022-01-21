import { Injectable } from '@angular/core';
import { DEPOSIT_OTHER_PAYMENTS } from '../constants/deposit-other-payments';
import { DepositOtherPayment } from '../entity/deposit-other-payments.interface';

@Injectable({
  providedIn: 'root'
})
export class DepositOtherPaymentsFacade {
  private readonly DepositOtherPayments: DepositOtherPayment[] =
    DEPOSIT_OTHER_PAYMENTS;

  getOtherPayments(): DepositOtherPayment[] {
    return this.DepositOtherPayments;
  }
}
