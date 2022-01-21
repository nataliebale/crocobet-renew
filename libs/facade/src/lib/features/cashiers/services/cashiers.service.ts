import { Injectable } from '@angular/core';
import { BaseUrl, HttpService } from '@crc/shared';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/types/types';
import { map } from 'rxjs/operators';
import { Cashier } from '../entity/cashiers.interface';

@Injectable({ providedIn: 'root' })
export class CashiersService {
  constructor(private readonly apiService: HttpService) {}

  getCashiers(): Observable<Cashier[]> {
    const path = '/cashiers/by-cities';
    const baseUrl: BaseUrl = 'cardsApiUrl';
    return this.apiService
      .get$<ApiResponse>({ path, baseUrl })
      .pipe(map((res) => res.data));
  }
}
