import { Injectable } from '@angular/core';
import { PromocodeService } from '../services/promocode.service';
import {
  Promocode,
  PromoCodeCheck,
  PromocodeRedeem
} from '../entity/promocode.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocodeFacade {
  constructor(private readonly promoCodeService: PromocodeService) {}

  checkPromoCode(promocode: string): Observable<Promocode> {
    return this.promoCodeService.checkPromoCode(promocode);
  }

  redeemPromoCode(promoCode: PromocodeRedeem): Observable<PromoCodeCheck> {
    return this.promoCodeService.redeemPromoCode(promoCode);
  }
}
