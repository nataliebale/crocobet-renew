import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpResponseCode } from '@crc/shared';

import { ResetPasswordService } from '../services/reset-password.service';
import {
  ResetPassword,
  ResetPasswordVerify
} from '../entity/reset-password.interface';

@Injectable({ providedIn: 'root' })
export class ResetPasswordFacade {
  private readonly showPassword$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  getResetPasswordState$() {
    return this.showPassword$.asObservable();
  }

  showResetPassword() {
    this.showPassword$.next(true);
  }

  closeResetPassword() {
    this.showPassword$.next(false);
  }

  resetPassword(body: ResetPassword): Observable<boolean> {
    return this.resetPasswordService.resetPassword(body).pipe(
      map(({ code, data }) => {
        return code === HttpResponseCode.OK && data;
      })
    );
  }

  resetPasswordVerify(body: ResetPasswordVerify): Observable<boolean> {
    return this.resetPasswordService.resetPasswordVerify(body).pipe(
      map(({ code, data }) => {
        return code === HttpResponseCode.OK && data;
      })
    );
  }
}
