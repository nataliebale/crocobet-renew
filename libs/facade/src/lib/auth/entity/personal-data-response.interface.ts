import { CurrencyCode, Language } from '@crc/shared';
import { UserDocument } from './user-document.interface';

interface AuxiliaryData {
  mobileCorrect: boolean;
  emailCorrect: boolean;
}

export interface PersonalDataResponse {
  accountBalance: number;
  accountStatus: number;
  address: string;
  auxiliaryData: AuxiliaryData;
  city: string;
  countryCode: string;
  currencyCode: CurrencyCode;
  customerId: number;
  dateOfBirth: number;
  dateOfBirthAsString: string;
  email: string;
  firstName: string;
  gender: number;
  languageCode: Language;
  lastName: string;
  loginName: string;
  mobileNumber: string;
  passportNumber: string;
  registrationDate: number;
  state: string;
  verificationStatus: boolean;
  userDocument?: UserDocument;
}
