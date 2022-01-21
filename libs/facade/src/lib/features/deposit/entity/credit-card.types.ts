export class CreditCardTypes {
  public static readonly Visa = 'visa';
  public static readonly Mastercard = 'mastercard';
  public static readonly AMEX = 'AMEX';
  // eslint-disable-next-line camelcase
  public static readonly Visa_Electron = 'Visa Electron';
}

export enum CreditCardType {
  Bog = 'BANK_OF_GEORGIA_DEPOSIT',
  Tbc = 'GEOPAY_GEORGIA_DEPOSIT'
}

export enum CreditCardTypeByProvider {
  BANK_OF_GEORGIA_DEPOSIT = 'BOG_DEPOSIT',
  GEOPAY_GEORGIA_DEPOSIT = 'TBC_DEPOSIT'
}
