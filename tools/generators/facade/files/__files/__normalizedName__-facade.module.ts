import { NgModule } from '@angular/core';

<% if(store) {%>
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { <%= feature.className %>Effects } from './store/effects/<%= feature.fileName %>.effects';
import { get<%= feature.className %>Reducer } from './store/reducers/<%= feature.fileName %>.reducer';
<% } %>

@NgModule({
  <% if(store) {%>
  imports: [
    EffectsModule.forFeature([<%= feature.className %>Effects]),
    StoreModule.forFeature('<%= feature.fileName %>', get<%= feature.className %>Reducer)
  ],
  <% } %>
})
export class <%= feature.className %>FacadeModule {}
