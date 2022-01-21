import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deposit } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-payment-presentation',
  templateUrl: './deposit-payment-presentation.component.html',
  styleUrls: ['./deposit-payment-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPaymentPresentationComponent {
  @Input() selectedCard: Deposit;

  @Output() openDepositPopup: EventEmitter<number> = new EventEmitter<number>();

  paymentForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.paymentForm = fb.group({
      transactionAmount: ['', [Validators.min(1), Validators.max(10000)]]
    });
  }

  onOpenDepositPopup() {
    this.openDepositPopup.emit();
  }
}
