import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService, BaseUrl } from '@crc/shared';

import { SportEventData, SportMatches } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class TopMatchesService {
  constructor(private readonly apiService: HttpService) {}

  getTopMatchEvents(date: string): Observable<SportMatches[]> {
    const path = `/rest/market/top-events?day=${date}`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService
      .get$<SportEventData>({ path, baseUrl })
      .pipe(map((data) => data.data));
  }
}
