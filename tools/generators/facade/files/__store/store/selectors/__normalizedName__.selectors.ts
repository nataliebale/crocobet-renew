import { createFeatureSelector, createSelector } from '@ngrx/store';

import { <%= feature.className %> } from '@crc/shared';

const get<%= feature.className %>FeatureState = createFeatureSelector<<%= feature.className %>>('<%= feature.propertyName %>');
const get<%= feature.className %>State = createSelector(get<%= feature.className %>FeatureState, (state) => state);

export const <%= feature.propertyName %>Selectors = {
  get<%= feature.className %>State
};
