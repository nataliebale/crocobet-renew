import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService, Language } from '@crc/shared';

import { Banner, BannerType } from '../entity';
import { Platform } from '../../../shared';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private readonly http: HttpService) {}

  getBanners(
    platform: Platform,
    bannerType: BannerType,
    lang: Language,
    customerId: number
  ): Observable<Banner[]> {
    return this.http
      .get$<any>({
        baseUrl: 'cmsApiUrl',
        path: `/banners?platform=${platform}&type=${bannerType}&lang=${lang}`.concat(
          customerId ? `&customerId=${customerId}` : ''
        )
      })
      .pipe(map((data) => data?.data));
  }
}
