import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl, HttpResponseCode, HttpService } from '@crc/shared';
import { ApiResponse } from '../../../shared/types/types';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Register } from '../entity/register.interface';

interface VerificationCode {
  messageBroadcastType: string;
  messageTypeName: string;
  mobile: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private readonly apiService: HttpService) {}

  checkFieldUniqueness$(field: string, value: string): Observable<boolean> {
    const list = ['mobile', 'passport-number'];

    if (list.includes(field)) {
      value = `${field}/${value}`;
      field = 'value';
    }

    const path = `/rest/customer/account/is-${field}-unique/${value}`;

    return this.apiService
      .get$<ApiResponse>({ path })
      .pipe(map((res) => !!res.data));
  }

  isDocumentIdGenuine$(params: HttpParams): Observable<boolean> {
    const baseUrl: BaseUrl = 'identomatUrl';
    const path = `/customers/id-check`;
    return this.apiService
      .get$<ApiResponse>({ path, params, baseUrl })
      .pipe(map(({ data }) => data.isReal && data.isAdult));
  }

  sendVerificationCode$(mobile: string): Observable<boolean> {
    const path = '/rest/customer/account/preregister';
    const body: VerificationCode = {
      messageBroadcastType: 'sms',
      messageTypeName: 'VERIFICATION',
      mobile
    };

    return this.apiService
      .post$<ApiResponse, VerificationCode>({ path, body })
      .pipe(map((response) => !!response?.data));
  }

  register$(body: Register): Observable<boolean> {
    const path = '/rest/customer/account/register';
    return this.apiService
      .post$<ApiResponse, Register>({ path, body })
      .pipe(
        map((res: ApiResponse) => res.code === HttpResponseCode.OK && res.data)
      );
  }
}
