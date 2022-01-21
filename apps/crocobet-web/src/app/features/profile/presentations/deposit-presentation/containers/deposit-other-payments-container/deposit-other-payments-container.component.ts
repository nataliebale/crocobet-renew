import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DepositOtherPayment, DepositOtherPaymentsFacade } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-other-payments-container',
  templateUrl: './deposit-other-payments-container.component.html',
  styleUrls: ['./deposit-other-payments-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositOtherPaymentsContainerComponent {
  otherPayments: DepositOtherPayment[];

  constructor(
    private readonly otherPaymentsFacade: DepositOtherPaymentsFacade
  ) {
    this.otherPayments = otherPaymentsFacade.getOtherPayments();
  }
}
