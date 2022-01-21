import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { getCardIcon } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-cards-footer-presentation',
  templateUrl: './deposit-cards-footer-presentation.component.html',
  styleUrls: ['./deposit-cards-footer-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositCardsFooterPresentationComponent implements OnInit {
  @Input() card;
  @Input() cardProviderImg;

  @Output() getCardType: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.card.cardNumber = this.card.cardNumber.match(/.{1,4}/g).join(' ');
    this.cardProviderImg = getCardIcon(this.card.cardNumber);
  }
}
