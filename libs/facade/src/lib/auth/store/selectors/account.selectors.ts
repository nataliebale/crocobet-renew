import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  JanuaryFirst2022,
  MarchFirst,
  PersonalData,
  VerificationStatus
} from '../../entity';

const getAuthFeatureState = createFeatureSelector<PersonalData>('account');

const selectPersonalData = createSelector(
  getAuthFeatureState,
  (state) => state
);

const selectUserName = createSelector(
  getAuthFeatureState,
  (state) => state.loginName
);

const selectVerificationStatus = createSelector(
  getAuthFeatureState,
  (state) => {
    const { userDocument, registrationDate } = state;
    let accountVerificationStatus;

    if (userDocument) {
      const { verificationStatus, verificationDate } = userDocument;

      if (!verificationStatus) {
        accountVerificationStatus = VerificationStatus.UNVERIFIED;
        if (verificationDate) {
          accountVerificationStatus = VerificationStatus.REJECTED;
        } else if (registrationDate >= JanuaryFirst2022) {
          accountVerificationStatus =
            VerificationStatus.UNVERIFIED_REGISTERED_AFTER_JANUARY;
        }
      } else if (!!verificationDate && verificationDate <= MarchFirst) {
        accountVerificationStatus =
          VerificationStatus.VERIFIED_REGISTERED_BEFORE_MARCH;
      } else {
        accountVerificationStatus = VerificationStatus.VERIFIED;
      }
    }

    return accountVerificationStatus;
  }
);

const selectPinCode = createSelector(
  getAuthFeatureState,
  (state) => state.pinCode
);

const selectCustomerId = createSelector(
  getAuthFeatureState,
  (state) => state.customerId
);

export const accountSelectors = {
  selectPersonalData,
  selectVerificationStatus,
  selectPinCode,
  selectUserName,
  selectCustomerId
};
