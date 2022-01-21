import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Footer, FooterCards, FooterLang, FooterMessenger } from '@crc/facade';
import { FooterFacade } from '@crc/facade';
import { Observable, of, switchMap } from 'rxjs';
import { LanguageFacade } from '@crc/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'crc-footer-container',
  templateUrl: './footer-container.component.html',
  styleUrls: ['./footer-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterContainerComponent {
  menuItems: Array<Footer> = this.footerFacade.getMenuItems();
  messengerMenu: Array<FooterMessenger> = this.footerFacade.getMessengerMenu();
  footerCards: Array<FooterCards> = this.footerFacade.getFooterCards();
  footerLicenseItems: Array<FooterCards> =
    this.footerFacade.getFooterLicenseItems();
  langItems: Observable<FooterLang[]>;

  constructor(
    private readonly footerFacade: FooterFacade,
    private readonly languageFacade: LanguageFacade
  ) {
    this.langItems = of(this.footerFacade.getLangItems()).pipe(
      switchMap((items) =>
        this.languageFacade.current$.pipe(
          map((current) => {
            return items.map((i) => {
              return { ...i, active: i.key === current };
            });
          })
        )
      )
    );
  }
}
