import { CreditCardTypes } from '..';

export function getCardIcon(creditCardNumber: string): string {
  const cardType = onGetCardType(creditCardNumber);

  if (
    cardType === CreditCardTypes.Visa ||
    cardType === CreditCardTypes.Visa_Electron
  ) {
    return CreditCardTypes.Visa;
  }
  return CreditCardTypes.Mastercard;
}

export function onGetCardType(num: string): string {
  // visa
  let re = new RegExp('^4');
  if (num.match(re) !== null) {
    return CreditCardTypes.Visa;
  }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (/^5[1-5]/.test(num)) {
    return CreditCardTypes.Mastercard;
  }

  // AMEX
  re = new RegExp('^3[47]');
  if (num.match(re) !== null) {
    return CreditCardTypes.AMEX;
  }

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (num.match(re) !== null) {
    return CreditCardTypes.Visa_Electron;
  }

  return '';
}
