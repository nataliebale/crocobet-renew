export interface Register {
  address: string;
  city: string;
  confirmPassword: string;
  countryCode: string;
  dateOfBirth: string;
  day: string;
  documentId: string;
  email: string;
  firstName: string;
  freeBetSpinChoice: string;
  iAgree: boolean;
  lastName: string;
  loginName: string;
  month: string;
  password: string;
  phoneNumber: string;
  pinCode: string | null;
  verificationCode: string;
  year: string;
}

export interface DocumentIdGenuine {
  documentNumber: string;
  birthYear: string;
}
