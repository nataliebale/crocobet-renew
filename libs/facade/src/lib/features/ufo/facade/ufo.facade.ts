import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UfoService } from '../services/ufo.service';
import {
  LanguageFacade,
  LanguageStorage,
  replaceLanguageKeyInString
} from '@crc/shared';

@Injectable({
  providedIn: 'root'
})
export class UfoFacade {
  constructor(
    private readonly ufoService: UfoService,
    private readonly langStorage: LanguageStorage,
    private readonly languageService: LanguageFacade
  ) {}

  replaceLanguage(url: string): string {
    const lang = this.langStorage.getLang();
    return replaceLanguageKeyInString(url, 'ka', lang);
  }

  getUfoLink(): Observable<string> {
    return this.languageService.current$.pipe(
      switchMap(() => {
        return this.ufoService.getUfoLink();
      })
    );
  }
}
