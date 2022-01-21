import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  apiUrl: string;
  authApiUrl: string;
  authCookieName: string;
  cmsApiUrl: string;
  cardsApiUrl: string;
  cookieDomain: string;
  identomatUrl: string;
  platform: 'desktop' | 'mobile';
  production: boolean;
  appVersion: string;
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>('ENV_CONFIG');
