import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  HttpResponseCode,
  HttpService,
  Language,
  RecoveryPasswordResponse
} from '@crc/shared';

import { LiveCallerUser, RecoveryPassword } from '../entity';
import { ApiResponse } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly apiService: HttpService
  ) {}

  initLiveCaller(userData: LiveCallerUser) {
    const requestBody = {
      path: 'https://cards.crocobet.com/api/jwt-sign/get',
      body: userData
    };
    return this.httpClient.post(requestBody.path, requestBody.body);
  }

  recoveryPassword(
    body: RecoveryPassword
  ): Observable<RecoveryPasswordResponse> {
    const path = `/rest/customer/account/change-password`;

    return this.apiService
      .post$<ApiResponse, RecoveryPassword>({ path, body })
      .pipe(
        map(({ code, data }) => {
          let result: RecoveryPasswordResponse;
          if (code === HttpResponseCode.OK && data) {
            result = RecoveryPasswordResponse.SUCCESS;
          } else if (code === HttpResponseCode.INCORRECT_OLD_PASSWORD) {
            result = RecoveryPasswordResponse.OLD_PASSWORD_INCORRECT;
          } else {
            result = RecoveryPasswordResponse.FAIL;
          }
          return result;
        }),
        catchError(() => {
          return of(RecoveryPasswordResponse.FAIL);
        })
      );
  }

  getDataLanguage(lang: Language): Observable<string> {
    const customBaseUrl = 'https://www.crocobet.com';
    const path = `/assets/lang/${lang}.js`;
    const responseType = 'text';
    return this.apiService.get$<string>({ path, customBaseUrl, responseType });
  }
}
