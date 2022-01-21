import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterItemView } from '@crc/components';
import { BaseUrl, HttpService } from '@crc/shared';

import { Provider } from '../../shared';
import { Platform } from '../../../shared';
import { CasinoGameSearch, ProviderCasinoGames } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class CasinoService {
  constructor(private readonly apiService: HttpService) {}

  getProvidersWithCasinos(platform: string): Observable<ProviderCasinoGames[]> {
    const type = 'casino';
    const path = `/integrations/v2/${type}/providers?platform=${platform}&include=games`;
    const baseUrl: BaseUrl = 'cmsApiUrl';

    return this.apiService
      .get$<{ data: ProviderCasinoGames[] }>({ path, baseUrl })
      .pipe(map((d) => d.data));
  }

  searchCasinos(
    platform: Platform,
    searchInput: string
  ): Observable<CasinoGameSearch[]> {
    const path = `/integrations/search?type=casino&platform=${platform}&search=${searchInput}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<{ data: CasinoGameSearch[] }>({ path, baseUrl })
      .pipe(map((data) => data.data));
  }

  getCasinoProviders(platform: Platform): Observable<Provider[]> {
    const path = `/integrations?type=casino&platform=${platform}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<any>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }
}
