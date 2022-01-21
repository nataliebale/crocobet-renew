import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Promotion } from '../entity/promotion.interface';
import { PromotionService } from '../services/promotion.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionFacade {
  promotion$: Observable<Promotion> = this.promotionService.getPromotion();

  constructor(private readonly promotionService: PromotionService) {}
}
