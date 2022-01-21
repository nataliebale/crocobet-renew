import { Action, createReducer, on } from '@ngrx/store';

import { accountActions, authActions } from '../actions';
import { PersonalData } from '../../entity';

const reducer = createReducer(
  {} as PersonalData,
  on(accountActions.getUserInfoSuccess, (state, action) => ({
    ...state,
    ...action.payload
  })),
  on(accountActions.getUserDocumentSuccess, (state, action) => ({
    ...state,
    userDocument: action.payload
  })),
  on(authActions.signOut, (state, action) => {
    return {} as PersonalData;
  }),
  on(accountActions.updateBalanceSuccess, (state, action) => ({
    ...state,
    ...action.payload
  }))
);

export function getAccountReducer(
  state: PersonalData | undefined,
  action: Action
) {
  return reducer(state, action);
}
