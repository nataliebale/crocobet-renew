import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CreditCardTypeByProvider, Deposit, PaymentForm } from '@crc/facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crc-w-shared-deposit-container',
  templateUrl: './deposit-container.component.html',
  styleUrls: ['./deposit-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositContainerComponent {
  @Input() slidesPerView: number;
  @Input() slidesPerViewTablet: number;
  @Input() isDepositButtonVisible: boolean;
  @Input() isFastDeposit: boolean;

  @Output() depositPopupClose: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  isDepositPopupVisible = false;
  selectedCard: Deposit;
  paymentFormFragment: PaymentForm;
  paymentAmount: number;

  paymentForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      transactionAmount: ['', [Validators.min(1), Validators.max(10000)]]
    });
  }

  onShowAddCardPopup(isPopupVisible: boolean) {
    this.isDepositPopupVisible = isPopupVisible;
    this.paymentFormFragment = null;
    this.paymentAmount = this.paymentForm.get('transactionAmount').value;
  }

  onClosePopup() {
    this.isDepositPopupVisible = false;
    this.depositPopupClose.emit();
    this.paymentForm.reset();
  }

  onCardSelected(deposit: Deposit) {
    this.selectedCard = deposit;
  }

  onOpenDepositPopup() {
    const $event = this.paymentForm.get('transactionAmount').value;

    this.isDepositPopupVisible = true;

    if (this.selectedCard?.paymentProvider) {
      this.paymentFormFragment = {
        providerId:
          CreditCardTypeByProvider[this.selectedCard?.paymentProvider],
        transactionAmount: $event,
        creditCardId: this.selectedCard?.creditCardId
      };
    } else {
      this.paymentAmount = $event;
    }
  }
}
