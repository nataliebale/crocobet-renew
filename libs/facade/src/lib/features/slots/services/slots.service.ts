import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseUrl, HttpService } from '@crc/shared';

import {
  CategorySlotGames,
  ProviderSlotGames,
  SlotGame,
  SlotGameSearch
} from '../entity';
import { Platform } from '../../../shared';
import { Provider } from '../../shared';

@Injectable({ providedIn: 'root' })
export class SlotsService {
  constructor(
    private readonly apiService: HttpService,
    // todo remove
    private readonly http: HttpClient
  ) {}

  getSlotsByCategory(
    category: string,
    platform: Platform
  ): Observable<SlotGame[]> {
    const type = 'slot';
    const path = `/integrations/categories?type=${type}&platform=${platform}&category=${category}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<{ data: CategorySlotGames }>({ path, baseUrl })
      .pipe(
        map(({ data }) => data?.games),
        share()
      );
  }

  getProvidersWithSlots(platform: string): Observable<ProviderSlotGames[]> {
    const type = 'slot';
    const path = `/integrations/v2/${type}/providers?platform=${platform}&include=games`;
    const baseUrl: BaseUrl = 'cmsApiUrl';

    return this.apiService
      .get$<{ data: ProviderSlotGames[] }>({ path, baseUrl })
      .pipe(map((d) => d.data));
  }

  getSlotSearchGames(
    platform: Platform,
    searchInput: string
  ): Observable<SlotGameSearch[]> {
    const path = `/integrations/search?type=slot&platform=${platform}&search=${searchInput}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<{ data: SlotGameSearch[] }>({ path, baseUrl })
      .pipe(map((data) => data.data));
  }

  // todo refactor
  getSlotGameFrameUrl(url: string): Observable<string> {
    return this.http.get<string>(
      url.replace('customerid={USERID}&', '').replace('www', 'api'),
      {
        responseType: 'text' as 'json',
        withCredentials: true
      }
    );
  }

  getSlotProviders(platform: Platform): Observable<Provider[]> {
    const path = `/integrations?type=slot&platform=${platform}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<any>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }
}
