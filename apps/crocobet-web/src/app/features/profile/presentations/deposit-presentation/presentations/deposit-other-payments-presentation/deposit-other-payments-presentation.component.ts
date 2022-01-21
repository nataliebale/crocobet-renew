import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DepositOtherPayment } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-other-payments-presentation',
  templateUrl: './deposit-other-payments-presentation.component.html',
  styleUrls: ['./deposit-other-payments-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositOtherPaymentsPresentationComponent {
  @Input() payments: DepositOtherPayment[];
}
