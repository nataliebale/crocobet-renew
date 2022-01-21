import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  Cookie,
  CookieService,
  EnvironmentService,
  isCardsApi,
  isCmsApi,
  isCrcApi,
  isCrcAuthApi,
  isIdentomatApi,
  LanguageStorage
} from '@crc/shared';

import { SessionService } from '../services';

const getHeaders = (
  token: string | void,
  lang: string
): {
  [name: string]: string | string[];
} => {
  return {
    'Content-type': 'application/json',
    'X-ODDS-SESSION': token || '',
    'Request-Language': lang
  };
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly cookieService: CookieService,
    private readonly sessionService: SessionService,
    private readonly langStorage: LanguageStorage,
    private readonly environmentService: EnvironmentService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !isCrcApi(req.url) &&
      !isCrcAuthApi(req.url) &&
      !isIdentomatApi(req.url) &&
      !isCmsApi(req.url) &&
      !isCardsApi(req.url)
    ) {
      return next.handle(req);
    }

    const token = this.sessionService.getToken();
    const lang = this.langStorage.getLang();

    const authReq = req.clone({
      setHeaders: getHeaders(token, lang),
      withCredentials: true
    });

    return next.handle(authReq).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          const { authCookieName } = this.environmentService.config;
          const value = response.headers.get(authCookieName) || '';
          if (value?.length) {
            const params: Cookie = {
              name: authCookieName,
              value,
              expires: 3
            };
            this.cookieService.set(params);
          }
        }
      }),
      catchError((error) => of(error))
    );
  }
}
