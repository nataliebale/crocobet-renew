export interface Deposit {
  defaultCardName?: string;
  cardNumber: string;
  cardType: string;
  creditCardId: number;
  customerId: number;
  defaultCard: boolean;
  paymentProvider: string;
  canEditCardName?: boolean;
}

export interface cardNameModel {
  name: string;
  id: number;
}

export interface DepositAmount {
  value: string;
  id: number;
}

export interface PaymentForm {
  // TODO REFACTOR პეიმენთის ინტერფეისებია დასალაგებელი
  providerId: string;
  transactionAmount: number;
  transactionCurrency?: string;
  callbackUrl?: string;
  activateCard?: boolean;
  creditCardId?: number;
}

export interface PaymentFormCard {
  accountId?: number;
  card: {
    activeCard?: boolean;
    creditCardId?: number;
  };
}
