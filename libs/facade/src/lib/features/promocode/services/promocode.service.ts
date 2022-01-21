import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseUrl, HttpService } from '@crc/shared';
import { map } from 'rxjs/operators';
import {
  Promocode,
  PromoCodeCheck,
  PromocodeRedeem
} from '../entity/promocode.interface';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  constructor(private readonly apiService: HttpService) {}

  checkPromoCode(promoCode: string): Observable<Promocode> {
    const path = `/campaigns/promo-codes/check?code=${promoCode}`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    return this.apiService
      .get$<{ data: Promocode }>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }

  redeemPromoCode(promoCode: PromocodeRedeem): Observable<PromoCodeCheck> {
    const path = `/campaigns/promo-codes/redeem`;
    const baseUrl: BaseUrl = 'cmsApiUrl';
    const body: PromocodeRedeem = { code: `${promoCode}` };

    return this.apiService
      .post$<{ data: PromoCodeCheck }, PromocodeRedeem>({
        path,
        baseUrl,
        body
      })
      .pipe(map((result) => result.data));
  }
}
