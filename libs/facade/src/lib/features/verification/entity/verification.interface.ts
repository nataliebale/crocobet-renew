/* eslint-disable camelcase */

const REJECTED_STATE_URL = 'https://promotions.crocobet.com/messages/#/error';
const PENDING_STATE_URL = 'https://promotions.crocobet.com/messages/#/pending';
const SUCCESS_STATE_URL = 'https://promotions.crocobet.com/messages/#/success';

// interface BirthDate {
//   day: string;
//   month: string;
//   year: string;
// }

//
// interface UserData {
//   firstName: string;
//   lastName: string;
//   birthDate: BirthDate;
//   documentId: string;
//   gender: string;
//   countryCode: string;
// }

// export interface IdentomatResult {
//   data: UserData;
// }

interface TokenData {
  _id: string;
  token: string;
  platform: string;
  returnUrl: string;
  createdAt: Date;
  __v: number;
}

interface Person {
  first_name: string;
  local_first_name: string;
  last_name: string;
  local_last_name: string;
  birthday: string;
  citizenship: string;
  nationality: string;
  document_number: string;
  document_expires: string;
  personal_number: string;
  birthday_time: string;
  document_expires_time: string;
  issuing_state: string;
  sex: string;
}

export interface IdentomatToken {
  data: TokenData;
}

export interface CompleteData {
  success: boolean;
  result: ResultModel;
  person?: Person;
}

export enum ResultModel {
  approved = 'approved',
  rejected = 'rejected',
  manualCheck = 'manual_check'
}

export interface Complete {
  data: CompleteData;
}

export const stateLinks = {
  error: REJECTED_STATE_URL,
  success: SUCCESS_STATE_URL,
  pending: PENDING_STATE_URL
};

export enum MessageCodes {
  resizeHeight = 2005,
  initialHeight = 2006,
  finishVerification = 2001,
  tryAgain = 2002,
  returnToMainPage = 2000
}

export type VerificationType = 'selfie' | 'liveness';

export interface VerificationModel {
  documentType: number | null;
  fileName: string;
  path: string;
  savedFileName: string;
  verificationDate: number | null;
  verificationStatus: Verification;
}

export enum Verification {
  NOT_VERIFIED,
  VERIFICATION_PENDING,
  VERIFIED
}
