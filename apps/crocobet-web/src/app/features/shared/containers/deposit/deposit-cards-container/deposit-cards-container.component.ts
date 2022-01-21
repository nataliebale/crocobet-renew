import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Deposit, DepositFacade } from '@crc/facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'crc-w-deposit-cards-container',
  templateUrl: './deposit-cards-container.component.html',
  styleUrls: ['./deposit-cards-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepositCardsContainerComponent implements OnInit {
  @Input() slidesPerViewTablet: number;
  @Input() slidesPerView: number;
  @Input() isFastDeposit: boolean;

  @Output() cardSelected: EventEmitter<Deposit> = new EventEmitter<Deposit>();
  @Output() showAddCardPopup: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  cards$: Observable<Deposit[]> = this.facade.cards$;
  cardToDelete: Deposit;
  showCardRemovalPopup = false;
  cardName: string;
  isDepositPopupVisible = false;
  selectedCard: Deposit;

  constructor(private readonly facade: DepositFacade) {}

  ngOnInit() {
    this.facade.requestCards();
  }

  onUpdateCardName(cardModel) {
    this.facade.updateCardName(cardModel.name, cardModel.id);
  }

  onRemoveCardName(creditCardId: number) {
    this.facade.removeCardName(creditCardId);
  }

  onOpenRemovePopup(card) {
    this.showCardRemovalPopup = true;
    this.cardToDelete = card;
  }

  onClickRemoveCard() {
    this.onRemoveCardName(this.cardToDelete.creditCardId);
    this.facade.removeCreditCard(this.cardToDelete.creditCardId).subscribe();
    this.showCardRemovalPopup = false;
  }

  onShowAddCardPopup() {
    this.showAddCardPopup.emit(true);
  }

  onCardSelected(deposit: Deposit) {
    this.cardSelected.emit(deposit);
  }
}
