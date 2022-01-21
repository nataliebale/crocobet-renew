import { Injectable } from '@angular/core';
import { StorageService } from '@crc/shared';

const key = 'cardNames';

type CardName = { id: number; name: string };
type CardNameList = Array<CardName>;

@Injectable({
  providedIn: 'root'
})
export class DepositCardsStorage extends StorageService<typeof key> {
  private getCard(creditCardId: number): CardName {
    return this.getCardNames().find(
      (c: CardName) => c !== null && c.id === creditCardId
    ) as CardName;
  }

  private updateCardName(cardName: CardName) {
    const cardNamesList = this.getCardNames().map((cName) => {
      return cName.id === cardName.id
        ? {
            ...cName,
            name: cardName.name
          }
        : cName;
    });
    this.updateNames(cardNamesList);
  }

  private createCardName(cardName: CardName) {
    const cardNamesList = [...this.getCardNames(), cardName];
    this.updateNames(cardNamesList);
  }

  setCardName(name: string, creditCardId: number) {
    const card = this.getCard(creditCardId);
    if (card) {
      this.updateCardName({ id: card.id, name });
    } else {
      this.createCardName({
        name,
        id: creditCardId
      });
    }
  }

  removeCardName(creditCardId: number) {
    this.updateNames(
      this.getCardNames().filter((card: CardName) => card.id !== creditCardId)
    );
  }

  getCardName(creditCardId: number): string | undefined {
    return this.getCard(creditCardId)?.name;
  }

  updateNames(cardList: CardNameList) {
    this.set(key, JSON.stringify(cardList));
  }

  getCardNames(): CardNameList {
    return JSON.parse(<string> this.get(key)) ?? [];
  }
}
