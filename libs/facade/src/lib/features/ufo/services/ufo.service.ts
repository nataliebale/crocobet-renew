import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseUrl, HttpService } from '@crc/shared';

@Injectable({
  providedIn: 'root'
})
export class UfoService {
  constructor(private readonly apiService: HttpService) {}

  getUfoLink(): Observable<string> {
    const path = `/rest/integrations/ig/ufo/get_game`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService.get$<string>({
      path,
      baseUrl,
      responseType: 'text'
    });
  }
}
