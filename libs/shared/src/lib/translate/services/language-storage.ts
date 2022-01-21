import { Injectable } from '@angular/core';

import { StorageService } from '../../utils';
import { Language } from '../types/language';
import { defaultLanguage } from '../constants/default-language';

@Injectable({
  providedIn: 'root'
})
export class LanguageStorage extends StorageService<'lang'> {
  setLang(lang: Language) {
    this.set('lang', lang);
  }

  getLang(): Language {
    return (this.get('lang') as Language) ?? defaultLanguage;
  }
}
