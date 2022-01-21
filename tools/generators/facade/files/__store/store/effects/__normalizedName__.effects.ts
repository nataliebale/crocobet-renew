import { Injectable } from '@angular/core';
import { catchError, map, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { <%= feature.propertyName %>Actions } from '../actions/<%= feature.fileName %>.actions';

@Injectable()
export class <%= feature.className %>Effects {
  get<%= feature.className %>$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(<%= feature.propertyName %>Actions.get<%= feature.className %>),
      mapTo({ id: 2, name: 'test' }),
      map((payload) => <%= feature.propertyName %>Actions.get<%= feature.className %>Success({ payload })),
      catchError(() => of(<%= feature.propertyName %>Actions.get<%= feature.className %>Error()))
    );
  });

  constructor(private readonly actions$: Actions) {}
}
