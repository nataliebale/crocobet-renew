import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseUrl, HttpService } from '@crc/shared';
import { Deposit } from '../entity/deposit.interface';
import {
  BankProvidersData,
  PaymentProviderResponse,
  PaymentRequestObj
} from '../..';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../shared/types';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(
    private readonly apiService: HttpService,
    private readonly http: HttpClient
  ) {}

  getCreditCards(providerID: number): Observable<Deposit[]> {
    const path = `/rest/payment/creditCard/list/${providerID}`;
    const baseUrl: BaseUrl = 'apiUrl';
    return this.apiService
      .get$<{ data: Deposit[] }>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }

  removeCreditCard(creditCardId: number): Observable<Deposit[]> {
    const path = `/rest/payment/creditCard/update`;
    const baseUrl: BaseUrl = 'apiUrl';
    const body = {
      creditCardId,
      activeCard: false
    };

    return this.apiService.post$({ path, baseUrl, body });
  }

  initialPaymentRequest(
    requestBody: PaymentRequestObj
  ): Observable<PaymentProviderResponse> {
    const path = `/rest/payment/payment/initialize`;
    const baseUrl: BaseUrl = 'apiUrl';
    const body = requestBody;

    return this.apiService
      .post$<ApiResponse, PaymentRequestObj>({ path, baseUrl, body })
      .pipe(map((res) => res.data));
  }

  processPaymentRequest(
    requestBody: PaymentRequestObj
  ): Observable<PaymentProviderResponse> {
    const path = `/rest/payment/payment/process`;
    const baseUrl: BaseUrl = 'apiUrl';
    const body = requestBody;

    return this.apiService
      .post$<ApiResponse, PaymentRequestObj>({ path, baseUrl, body })
      .pipe(map((res) => res.data));
  }

  getBankProviders(): Observable<BankProvidersData[]> {
    const path = '/rest/payment/providers/active';
    const baseUrl: BaseUrl = 'apiUrl';

    return this.apiService
      .get$<{ data: BankProvidersData[] }>({ path, baseUrl })
      .pipe(map((result) => result.data));
  }
}
