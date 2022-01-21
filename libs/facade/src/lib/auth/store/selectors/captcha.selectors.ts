import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CaptchaState } from '../state';

const getCaptchaFeatureState = createFeatureSelector<CaptchaState>('captcha');

const getCaptchaCode = createSelector(
  getCaptchaFeatureState,
  (state) => state?.captchaCode
);
const getCheckedCaptchaSuccess = createSelector(
  getCaptchaFeatureState,
  (state) => state?.isCaptchaCheckedSuccess
);

export const captchaSelectors = {
  getCaptchaCode,
  getCheckedCaptchaSuccess
};
