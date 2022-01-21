import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';

import { Cookie } from './cookie.interface';
import { EnvironmentService } from '../../environment';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { HttpRequest } from '@angular/common/http';

// reference: https://github.com/7leads/ngx-cookie-service
@Injectable({ providedIn: 'root' })
export class CookieService {
  private path = '/';

  private get cookie(): string {
    return isPlatformServer(this.platformId) ? '' : this.document.cookie;
  }

  private set cookie(cookies) {
    if (!isPlatformServer(this.platformId)) {
      this.document.cookie = cookies;
    }
  }

  private getCookieRegExp(name: string): RegExp {
    const escapedName = name.replace(/([[\]{}()|=;+?,.*^$])/gi, '\\$1');

    return new RegExp(
      '(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)',
      'g'
    );
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Record<string, unknown>,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly environmentService: EnvironmentService
  ) {}

  check(name: string): boolean {
    name = encodeURIComponent(name);

    const regExp: RegExp = this.getCookieRegExp(name);
    const exists = regExp.test(this.cookie);

    return exists;
  }

  delete(name: string) {
    const value = '';
    const expires = new Date('Thu, 01 Jan 1970 00:00:01 GMT');

    this.set({ expires, name, value });
  }

  get(name: string): string {
    if (this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray | null = regExp.exec(this.cookie);
      if (result) {
        return decodeURIComponent(result[1]);
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (this.cookie && this.cookie !== '') {
      const split: string[] = this.cookie.split(';');

      for (let i = 0; i < split.length; i += 1) {
        const currentCookie: string[] = split[i].split('=');

        currentCookie[0] = currentCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(
          currentCookie[1]
        );
      }
    }

    return cookies;
  }

  set({ expires, name, value }: Cookie) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )};path=${this.path};`;

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires = new Date(
          new Date().getTime() + expires * 1000 * 60 * 60 * 24
        );

        cookieString += `expires=${dateExpires.toUTCString()};`;
      } else {
        cookieString += `expires=${expires.toUTCString()};`;
      }
    }

    cookieString += `domain=${this.environmentService.config.cookieDomain};`;

    this.cookie = cookieString;
  }
}
