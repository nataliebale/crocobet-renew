import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserPPData } from '../entity/user-p-p-data';

@Injectable({
  providedIn: 'root'
})
export class SecretCardService {
  constructor(private readonly http: HttpClient) {}

  generateHash(userData: UserPPData) {
    const url = 'https://cards.crocobet.com/api/hash';
    return this.http.post(url, {
      // eslint-disable-next-line camelcase
      personal_number: userData.personalNumber,
      pincode: userData.pinCode
    });
  }
}
