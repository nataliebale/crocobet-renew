import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable, retry } from 'rxjs';

import { AccountFacade, PersonalData } from '../../../auth';
import { SecretCardService } from '../services/secret-card.service';
import { UserPPDataWithHash } from '../entity/user-p-p-data';

@Injectable({
  providedIn: 'root'
})
export class SecretCardFacade {
  constructor(
    private readonly accountFacade: AccountFacade,
    private readonly secretCardService: SecretCardService
  ) {}

  getCustomerDataHash(): Observable<UserPPDataWithHash> {
    return this.accountFacade.personalData$.pipe(
      take(1),
      switchMap((personalData: PersonalData) => {
        return this.secretCardService
          .generateHash({
            personalNumber: personalData.passportNumber,
            pinCode: personalData.pinCode
          })
          .pipe(
            retry(2),
            map((data: any) => {
              return {
                hash: data['data'],
                personalNumber: personalData.passportNumber,
                pinCode: personalData.pinCode
              } as UserPPDataWithHash;
            })
          );
      })
    );
  }
}
