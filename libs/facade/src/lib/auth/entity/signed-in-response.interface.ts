import { CurrencyCode, Language } from '@crc/shared';

export interface SignedInResponse {
  balance: number;
  bonusBalanceList: number[];
  currencyCode: CurrencyCode;
  email: string;
  firstName: string;
  language: Language;
  lastBalanceCheck: number;
  passportNumber: string;
  lastName: string;
  login: string;
  mobile: string;
  pinCode: string;
  userId: number;
}
