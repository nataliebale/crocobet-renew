import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LanguageFacade } from '@crc/shared';
import { TopMatchesService } from '../services/top-matches.service';
import { SportMatches } from '../entity';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TopMatchesFacade {
  topMatchEvents$: Observable<SportMatches[]>;

  constructor(
    private readonly topMatchesService: TopMatchesService,
    private readonly languageService: LanguageFacade
  ) {
    const today = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    this.topMatchEvents$ = this.languageService.current$.pipe(
      switchMap(() => this.topMatchesService.getTopMatchEvents(today))
    );
  }
}
