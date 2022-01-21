import { createAction, props } from '@ngrx/store';

import { <%= feature.className %> } from '@crc/shared';

const get<%= feature.className %> = createAction('[<%= feature.className %>] Get items');
const get<%= feature.className %>Success = createAction(
  '[<%= feature.className %>] Get items success',
  props<{ payload: <%= feature.className %> }>()
);
const get<%= feature.className %>Error = createAction('[<%= feature.className %>] Get items error');

export const <%= feature.propertyName %>Actions = {
  get<%= feature.className %>,
  get<%= feature.className %>Success,
  get<%= feature.className %>Error
};
