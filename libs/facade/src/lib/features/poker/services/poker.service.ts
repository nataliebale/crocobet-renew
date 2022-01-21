import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseUrl, HttpService } from '@crc/shared';

@Injectable({
  providedIn: 'root'
})
export class PokerService {
  constructor(private readonly httpService: HttpService) {}

  getPokerLink(): Observable<string> {
    const path = `/rest/integrations/ig/betconstruct/get_game_casino?`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.httpService.get$<string>({
      path,
      baseUrl,
      responseType: 'text' as 'json'
    });
  }
}
