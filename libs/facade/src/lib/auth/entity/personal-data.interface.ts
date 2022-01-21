import { PersonalDataResponse } from './personal-data-response.interface';
import { SignedInResponse } from './signed-in-response.interface';

export type PersonalData = PersonalDataResponse & SignedInResponse;
