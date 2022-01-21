import { Action, createReducer, on } from '@ngrx/store';

import { authActions, captchaActions } from '../actions';
import { CaptchaState } from '../state';

const reducer = createReducer(
  {} as CaptchaState,
  on(captchaActions.updateCaptchaCode, (state, action) => ({
    ...state,
    captchaCode: action.payload
  })),
  on(captchaActions.closeCaptchaModal, (state) => ({
    ...state,
    captchaCode: '',
    isCaptchaCheckedSuccess: undefined
  })),
  on(captchaActions.checkCaptchaValiditySuccess, (state, action) => ({
    ...state,
    isCaptchaCheckedSuccess: action.payload
  })),
  on(authActions.signOut, (state, action) => {
    return {} as CaptchaState;
  })
);

export function getCaptchaReducer(state: CaptchaState, action: Action) {
  return reducer(state, action);
}
