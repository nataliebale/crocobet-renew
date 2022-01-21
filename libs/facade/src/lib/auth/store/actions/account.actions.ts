import { createAction, props } from '@ngrx/store';

import { PersonalData, UserDocument } from '../../entity';

const updateUser = createAction(
  '[CoreSession] Update User',
  props<{ payload: PersonalData }>()
);
const updateUserSuccess = createAction('[CoreSession] Update User Success');

const getUserInfo = createAction('[Account] Get User Info');
const getUserInfoSuccess = createAction(
  '[Account] Get User Info Success',
  props<{ payload: PersonalData }>()
);
const getUserInfoError = createAction('[Account] Get User Info Error');

const getUserDocument = createAction('[Account] Get User Document');
const getUserDocumentSuccess = createAction(
  '[Account] Get User Document Success',
  props<{ payload: UserDocument }>()
);
const getUserDocumentError = createAction('[Account] Get User Document Error');
const updateBalanceEvery5Second = createAction(
  '[Account] Update Balance Every 5 Second'
);
const updateBalance = createAction('[Account] Update Balance');
const updateBalanceSuccess = createAction(
  '[Account] Update Balance Success',
  props<{ payload: PersonalData }>()
);
const updateBalanceError = createAction('[Account] Update Balance Error');
const findIfSessionAlive = createAction('[Account] Find If Session Is Alive');
const keepSessionAliveEvery60Second = createAction(
  '[CoreSession] Keep Session Alive Every 60 Seconds'
);
const keepSessionAlive = createAction('[CoreSession] Keep Session Alive');
const keepSessionAliveSuccess = createAction(
  '[CoreSession] Keep Session Alive Success'
);
const keepSessionAliveError = createAction(
  '[CoreSession] Keep Session Alive Error'
);

export const accountActions = {
  updateUser,
  updateUserSuccess,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoError,
  getUserDocument,
  getUserDocumentSuccess,
  getUserDocumentError,
  updateBalanceEvery5Second,
  updateBalance,
  updateBalanceSuccess,
  updateBalanceError,
  findIfSessionAlive,
  keepSessionAliveEvery60Second,
  keepSessionAlive,
  keepSessionAliveSuccess,
  keepSessionAliveError
};
