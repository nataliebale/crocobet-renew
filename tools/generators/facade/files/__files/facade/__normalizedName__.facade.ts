import { Injectable } from '@angular/core';

<% if(store) {%>
import { <%= feature.className %> } from '../entity/<%= feature.fileName %>.interface.ts';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { <%= feature.className %>FeatureState } from '../store/state/<%= feature.fileName %>-feature-state';
import { <%= feature.fileName %>Selectors } from '../store/selectors/<%= feature.fileName %>.selectors';
import { <%= feature.fileName %>Actions } from '../store/actions/<%= feature.fileName %>.actions';
<% } %>

@Injectable({
  providedIn: 'root'
})
export class <%= feature.className %>Facade {
  <% if(store) {%>
  readonly get<%= feature.className %>$: Observable<<%= feature.className %>> = this.store$.select(
    <%= feature.fileName %>Selectors.get<%= feature.className %>State
  );

  constructor(private readonly store$: Store<<%= feature.className %>FeatureState>) {}

  get<%= feature.className %>() {
    this.store$.dispatch(<%= feature.fileName %>Actions.get<%= feature.className %>());
  }
  <% } %>
}
