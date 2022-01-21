import { Injectable } from '@angular/core';
import { HttpService } from '@crc/shared';
import {
  ResetPassword,
  ResetPasswordVerify
} from '../entity/reset-password.interface';
import { ApiResponse } from '../../../shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  constructor(private readonly apiService: HttpService) {}

  resetPassword(body: ResetPassword): Observable<ApiResponse> {
    const path = '/rest/customer/account/reset-password';
    return this.apiService.post$<ApiResponse, ResetPassword>({ path, body });
  }

  resetPasswordVerify(body: ResetPasswordVerify): Observable<ApiResponse> {
    const path = '/rest/customer/account/reset-password-verify';
    return this.apiService.post$<ApiResponse, ResetPasswordVerify>({
      path,
      body
    });
  }
}
