import { createAction, props } from '@ngrx/store';

import { LoginErrorResponse, SignInPayload } from '../../entity';

createAction('[CoreSession] Session Initialized');
const signIn = createAction(
  '[CoreSession] Sign In',
  props<{ payload: SignInPayload }>()
);
const signInError = createAction(
  '[CoreSession] Sign In Error',
  props<{ payload: LoginErrorResponse }>()
);
const signInSuccess = createAction('[CoreSession] Sign In Success');
const signOut = createAction('[CoreSession] Sign Out');
const signOutSuccess = createAction('[CoreSession] Sign Out Success');

export const authActions = {
  signIn,
  signInSuccess,
  signInError,
  signOut,
  signOutSuccess
};
