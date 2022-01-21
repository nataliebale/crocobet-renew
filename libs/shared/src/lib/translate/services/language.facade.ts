import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LanguageStorage } from './language-storage';
import { Language } from '../types/language';
import { reload } from '../../functions';

@Injectable({
  providedIn: 'root'
})
export class LanguageFacade {
  private $current = new BehaviorSubject<Language>(
    this.translate.getDefaultLang() as Language
  );

  current$ = this.$current.pipe(
    distinctUntilChanged(),
    filter((lang) => !!lang)
  );

  constructor(
    private readonly translate: TranslateService,
    private readonly langStorage: LanguageStorage,
    private readonly router: Router
  ) {}

  translateInstant(str: string): string {
    return this.translate.instant(str);
  }

  setLanguage(language: Language) {
    this.translate.use(language);
    this.langStorage.setLang(language);
    if (this.router.url.includes('verification')) {
      reload();
    } else {
      this.$current.next(language);
    }
  }

  translateStream(str: string): Observable<string> {
    return this.translate.stream(str);
  }

  getLangReturnGeIfKa(): string {
    const lang = this.langStorage.getLang() as Language;
    return lang === 'ka' ? 'ge' : lang;
  }
}
