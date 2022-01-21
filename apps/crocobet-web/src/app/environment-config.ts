import { EnvironmentConfig } from '@crc/shared';

import { environment } from '../environments/environment';

export const envConfig: EnvironmentConfig = {
  apiUrl: environment.apiUrl,
  authApiUrl: environment.authApiUrl,
  authCookieName: 'X-ODDS-SESSION',
  cmsApiUrl: environment.cmsApiUrl,
  cookieDomain: environment.cookieDomain,
  identomatUrl: environment.identomatUrl,
  cardsApiUrl: environment.cardsApiUrl,
  platform: 'desktop',
  production: environment.production,
  appVersion: environment.appVersion
};
