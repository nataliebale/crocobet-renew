import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '@crc/shared';

import { Promotion, PromotionData } from '../entity/promotion.interface';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private readonly http: HttpService) {}

  getPromotion(): Observable<Promotion> {
    return of({ isActive: false });
  }
}
