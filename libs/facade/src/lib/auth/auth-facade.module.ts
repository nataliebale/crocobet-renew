import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AccountEffect, AuthEffects, CaptchaEffects } from './store/effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { getAccountReducer, getCaptchaReducer } from './store/reducers';

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects, AccountEffect, CaptchaEffects]),
    StoreModule.forFeature('captcha', getCaptchaReducer),
    StoreModule.forFeature('account', getAccountReducer),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthFacadeModule {}
