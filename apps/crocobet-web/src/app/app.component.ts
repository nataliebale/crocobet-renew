import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { AccountFacade, PersonalData } from '@crc/facade';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import * as LiveCaller from '../../../../libs/components/src/lib/live-caller/live-caller';
import { EnvironmentService, Language } from '@crc/shared';
import { DictionaryDataService } from './core/services/dictionary-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@UntilDestroy()
export class AppComponent implements OnInit {
  userData$: Observable<PersonalData> = this.accountFacade.personalData$;
  currentLanguage$: Observable<string> = this.accountFacade.currentLanguage$;

  @ViewChild('scriptWrapper') scriptWrapper: ElementRef;

  private handleDictionaryData(res: string, id: string) {
    const oldTag = document.getElementById(id);
    if (oldTag) {
      oldTag.remove();
    }
    const dictionaryTag = this.renderer.createElement('script');
    const dictionaryData = this.renderer.createText(res);
    this.renderer.setAttribute(dictionaryTag, 'id', id);
    this.renderer.appendChild(dictionaryTag, dictionaryData);
    this.renderer.appendChild(this.scriptWrapper.nativeElement, dictionaryTag);
  }

  constructor(
    private readonly accountFacade: AccountFacade,
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private readonly env: EnvironmentService,
    dictionaryDataService: DictionaryDataService
  ) {
    window['appVersion'] = env.config.appVersion;

    this.currentLanguage$
      .pipe(
        untilDestroyed(this),
        tap((lang) => {
          LiveCaller.initLiveCaller(lang);
        }),
        switchMap((lang: Language) => this.accountFacade.getDataLanguage(lang)),
        tap((res) => this.handleDictionaryData(res, 'language-script')),
        tap(() =>
          dictionaryDataService.setDataLoaded(!!window['dictionaryData'])
        )
      )
      .subscribe();
  }

  ngOnInit() {
    this.accountFacade.checkIfSessionIsAlive();
    this.subscribeToUserData();
  }

  subscribeToUserData() {
    this.userData$
      .pipe(
        untilDestroyed(this),
        delay(1000),
        filter((user) => !!user?.userId),
        distinctUntilChanged((pre, cur) => pre.userId === cur.userId),
        tap((user) => {
          this.initLiveCaller(user);
        })
      )
      .subscribe();
  }

  initLiveCaller(_user: PersonalData) {
    const decodedData = {
      userId: _user.userId,
      firstName: _user.firstName,
      login: _user.login,
      pinCode: _user.pinCode,
      email: _user.email,
      mobile: _user.mobile
    };
    this.accountFacade
      .getUserLiveCaller(decodedData)
      .pipe(
        untilDestroyed(this),
        tap((res: any) => {
          if (window?.['LiveCaller']) {
            window['LiveCaller'].$emit('user.login', res?.data);
          }
        }),
        catchError((err) => {
          console.error(err.stack);
          return of(null);
        })
      )
      .subscribe();
  }
}
