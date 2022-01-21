import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CreditCardType } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-cards-content-presentation',
  templateUrl: './deposit-cards-content-presentation.component.html',
  styleUrls: ['./deposit-cards-content-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositCardsContentPresentationComponent {
  CreditCardType = CreditCardType;
  @Input() card;
}
