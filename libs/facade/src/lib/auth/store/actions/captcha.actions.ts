import { createAction, props } from '@ngrx/store';
import { EnteredCaptchaModel } from '../../entity';

const updateCaptchaCode = createAction(
  '[Captcha] Update Captcha Code',
  props<{ payload: string }>()
);
const closeCaptchaModal = createAction('[Captcha] Close Captcha Modal');
const resetCaptchaCode = createAction(
  '[Captcha] Close Captcha Code',
  props<{ payload: string }>()
);
const resetCaptchaCodeSuccess = createAction(
  '[Captcha] Close Captcha Code Success'
);
const resetCaptchaCodeError = createAction(
  '[Captcha] Close Captcha Code Error'
);

const checkCaptchaValidity = createAction(
  '[Captcha] Check Captcha Validity',
  props<{ payload: EnteredCaptchaModel }>()
);

const checkCaptchaValiditySuccess = createAction(
  '[Captcha] Check Captcha Validity Success',
  props<{ payload: boolean }>()
);

export const captchaActions = {
  updateCaptchaCode,
  closeCaptchaModal,
  resetCaptchaCode,
  resetCaptchaCodeSuccess,
  resetCaptchaCodeError,
  checkCaptchaValidity,
  checkCaptchaValiditySuccess
};
