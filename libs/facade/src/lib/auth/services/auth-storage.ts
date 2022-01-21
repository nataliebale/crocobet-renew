import { Injectable } from '@angular/core';

import { StorageService } from '@crc/shared';

import { SignedInResponse } from '../entity';

@Injectable({
  providedIn: 'root'
})
export class AuthStorage extends StorageService<'loginData'> {
  setLoginData(data: SignedInResponse) {
    this.set('loginData', JSON.stringify(data));
  }

  clearLoginData() {
    this.clearItem('loginData');
  }

  getLoginData(): string | null {
    return this.get('loginData');
  }
}
