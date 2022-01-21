import { Action, createReducer, on } from '@ngrx/store';

import { <%= feature.className %> } from '@crc/shared';
import { <%= feature.propertyName %>Actions } from '../actions/<%= feature.fileName %>.actions';

const INITIAL_SAMPLE_STATE: <%= feature.className %> = { id: 1, name: '<%= feature.fileName %>' };

const reducer = createReducer(
  INITIAL_SAMPLE_STATE,
  on(<%= feature.propertyName %>Actions.get<%= feature.className %>, (state: <%= feature.className %>) => ({ ...state })),
  on(<%= feature.propertyName %>Actions.get<%= feature.className %>Success, (state, <%= feature.fileName %>) => ({
    ...state,
    ...<%= feature.fileName %>.payload
  }))
);

export function get<%= feature.className %>Reducer(state: <%= feature.className %> | undefined, action: Action) {
  return reducer(state, action);
}
