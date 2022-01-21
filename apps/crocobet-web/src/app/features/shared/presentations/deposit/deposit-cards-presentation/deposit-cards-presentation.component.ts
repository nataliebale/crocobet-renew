import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { cardNameModel, Deposit } from '@crc/facade';

@Component({
  selector: 'crc-w-deposit-cards-presentation',
  templateUrl: './deposit-cards-presentation.component.html',
  styleUrls: ['./deposit-cards-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositCardsPresentationComponent {
  @Input() cardName: string;
  @Input() cardProviderImg: string;
  @Input() cards: Deposit[];
  @Input() showCardRemovalPopup: boolean;
  @Input() cardToDelete: Deposit;
  @Input() selectedCard: Deposit;
  @Input() canEditCardName: boolean;
  @Input() slidesPerView: number;
  @Input() slidesPerViewTablet: number;
  @Input() isFastDeposit: boolean;

  @Output() editOnClick: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() clickOnRemoveCard: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() getCardType: EventEmitter<string> = new EventEmitter<string>();
  @Output() cardModel: EventEmitter<cardNameModel> =
    new EventEmitter<cardNameModel>();
  @Output() toggleAddCardPopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() cardSelected: EventEmitter<Deposit> = new EventEmitter<Deposit>();

  @ViewChild('cardNameInput') cardNameInput;

  onGetCardType(card) {
    this.getCardType.emit(card);
  }

  onClickRemove(card) {
    this.showCardRemovalPopup = true;
    this.editOnClick.emit(card);
  }

  onUpdateCardName(cardModel) {
    this.cardModel.emit({ name: cardModel.name, id: cardModel.id });
  }

  onRemoveCard(card) {
    this.clickOnRemoveCard.emit(card);
  }

  onOpenAddCardPopup() {
    this.toggleAddCardPopup.emit();
  }

  onSelectCard(card: Deposit) {
    this.selectedCard = card;
    this.cardSelected.emit(card);
  }
}
