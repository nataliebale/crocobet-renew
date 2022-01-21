import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Complete,
  IdentomatToken,
  Verification,
  VerificationModel,
  VerificationType
} from '../entity/verification.interface';
import { BaseUrl, HttpService, LanguageStorage } from '@crc/shared';
import { identomatBody } from '../utils/identomat-body.util';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private readonly tokenId$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private readonly verificationData$: BehaviorSubject<VerificationModel>;

  private readonly bodyObj: Record<string, any>;

  private handleSuccess(next: any) {
    if (next.code === 200) {
      this.verificationData$.next(next.data);
    }
  }

  constructor(
    private readonly apiService: HttpService,
    languageStorage: LanguageStorage
  ) {
    this.bodyObj = identomatBody(languageStorage.getLang());
    this.verificationData$ = new BehaviorSubject<VerificationModel>({
      documentType: null,
      fileName: '',
      path: '',
      savedFileName: '',
      verificationDate: null,
      verificationStatus: Verification.NOT_VERIFIED
    });
  }

  getIdentomatToken(verificationType: VerificationType) {
    const path = '/identomat-api/begin';
    const baseUrl: BaseUrl = 'identomatUrl';
    const body = this.bodyObj[verificationType];
    this.apiService
      .post$<IdentomatToken, Record<string, any>>({ path, baseUrl, body })
      .pipe(
        tap(({ data }: IdentomatToken) => {
          if (data) {
            this.tokenId$.next(data.token);
          }
        })
      )
      .subscribe();
  }

  getVerificationStatus() {
    const path = '/rest/customer/account/get-document-scan/1';
    const baseUrl: BaseUrl = 'apiUrl';
    this.apiService
      .get$({ path, baseUrl })
      .pipe(
        tap((next) => {
          if (next) {
            this.handleSuccess(next);
          }
        })
      )
      .subscribe();
  }

  completeVerification$(): Observable<Complete> {
    const path = '/identomat-api/complete';
    const baseUrl: BaseUrl = 'identomatUrl';

    const body = {
      token: this.tokenId$.value
    };
    return this.apiService.post$<Complete, { token: string }>({
      path,
      baseUrl,
      body
    });
  }

  getTokenId$(): Observable<string> {
    return this.tokenId$.asObservable();
  }
}
