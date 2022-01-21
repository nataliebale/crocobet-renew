import { Injectable } from '@angular/core';

import { CookieService, EnvironmentService } from '@crc/shared';

import { AuthStorage } from './auth-storage';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly cookieService: CookieService,
    private readonly authStorageService: AuthStorage
  ) {}

  getToken(): string | void {
    return this.cookieService.get(
      this.environmentService.config.authCookieName
    );
  }

  signOut() {
    this.cookieService.delete(this.environmentService.config.authCookieName);
    this.authStorageService.clearLoginData();
  }
}
