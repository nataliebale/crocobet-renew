import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Deposit } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-payment-container',
  templateUrl: './deposit-payment-container.component.html',
  styleUrls: ['./deposit-payment-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositPaymentContainerComponent {
  @Input() selectedCard: Deposit;

  @Output() openDepositPopup: EventEmitter<number> = new EventEmitter<number>();

  onOpenDepositPopup($event: number) {
    this.openDepositPopup.emit($event);
  }
}
