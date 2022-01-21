import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { HttpParams } from '@angular/common/http';
import { DocumentIdGenuine, Register } from '../entity/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterFacade {
  constructor(private readonly registerService: RegisterService) {}

  checkFieldUniqueness$(field: string, value: string): Observable<boolean> {
    return this.registerService.checkFieldUniqueness$(field, value);
  }

  isDocumentIdGenuine$(body: DocumentIdGenuine): Observable<boolean> {
    const params: HttpParams = new HttpParams()
      .set('privateNumber', body.documentNumber)
      .set('birthYear', body.birthYear);

    return this.registerService.isDocumentIdGenuine$(params);
  }

  sendVerificationCode$(mobile: string): Observable<boolean> {
    return this.registerService.sendVerificationCode$(mobile);
  }

  register$(registerBody: Register): Observable<boolean> {
    return this.registerService.register$(registerBody);
  }
}
