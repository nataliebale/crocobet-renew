import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { cardNameModel, Deposit, DepositCardsStorage } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-cards-header-presentation',
  templateUrl: './deposit-cards-header-presentation.component.html',
  styleUrls: ['./deposit-cards-header-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositCardsHeaderPresentationComponent implements OnInit {
  @Input() cardToDelete: Deposit;
  @Input() card: Deposit;
  @Input() cardName: string;
  @Input() cardList: Array<Deposit[]>;
  @Input() showCardRemovalPopup: boolean;

  @Output() clickOnRemoveCard: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() cardModel: EventEmitter<cardNameModel> =
    new EventEmitter<cardNameModel>();
  @Output() cardNames: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('cardNameInput') cardNameInput: ElementRef;

  constructor(private readonly depositCardStorage: DepositCardsStorage) {}

  ngOnInit() {
    this.cardName = this.depositCardStorage.getCardName(this.card.creditCardId);
  }

  onEditCardName(card) {
    card.canEditCardName = true;
    setTimeout(() => this.cardNameInput.nativeElement.focus());
  }

  onUpdateCardName(card) {
    card.canEditCardName = false;
    this.cardModel.emit({ name: this.cardName, id: this.card.creditCardId });
  }

  onRemoveCard(card) {
    this.clickOnRemoveCard.emit(card);
  }
}
