import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl, HttpService } from '@crc/shared';

import {
  AuthResponse,
  CaptchaCheckResponse,
  EnteredCaptchaModel,
  SignInPayload
} from '../entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly apiService: HttpService) {}

  getUser$(): Observable<AuthResponse> {
    const path = '/rest/customer/account/personal-data';
    return this.apiService.get$<AuthResponse>({ path });
  }

  signIn$(body: SignInPayload): Observable<AuthResponse> {
    const path = '/login';
    const baseUrl: BaseUrl = 'authApiUrl';
    return this.apiService.post$({ path, baseUrl, body });
  }

  signOut$(): Observable<void> {
    const path = '/rest/customer/session/logout';
    return this.apiService.delete$({ path });
  }

  resetCaptchaCode$(loginName: string): Observable<AuthResponse> {
    const path = '/captcha/change';
    const baseUrl: BaseUrl = 'authApiUrl';
    const body = { loginName };
    return this.apiService.post$({ path, baseUrl, body });
  }

  checkCaptchaValidity$(
    body: EnteredCaptchaModel
  ): Observable<CaptchaCheckResponse> {
    const path = '/captcha/check';
    const baseUrl: BaseUrl = 'authApiUrl';
    return this.apiService.post$({ body, path, baseUrl });
  }

  keepSessionAlive$(): Observable<AuthResponse> {
    const path = '/rest/customer/session/customerData/false';
    return this.apiService.get$({ path });
  }

  getUserDocument(): Observable<AuthResponse> {
    const path = '/rest/customer/account/get-document-scan/1';
    return this.apiService.get$({ path });
  }
}
