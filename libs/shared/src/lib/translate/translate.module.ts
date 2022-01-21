import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule as NgxTranslateModule
} from '@ngx-translate/core';

import { translateLoaderFactory } from './factory/translate-loader-factory';
import { EnvironmentService } from '../environment';
import { LanguageFacade } from './services/language.facade';
import { LanguageStorage } from './services/language-storage';

@NgModule({
  exports: [NgxTranslateModule],
  imports: [
    NgxTranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient, EnvironmentService]
      }
    })
  ]
})
export class TranslateModule {
  constructor(
    private readonly langStorage: LanguageStorage,
    private readonly languageService: LanguageFacade
  ) {
    this.languageService.setLanguage(this.langStorage.getLang());
  }
}
