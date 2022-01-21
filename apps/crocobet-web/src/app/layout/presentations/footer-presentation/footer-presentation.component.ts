import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Language, LanguageFacade } from '@crc/shared';
import { Footer, FooterCards, FooterLang, FooterMessenger } from '@crc/facade';

@Component({
  selector: 'crc-footer-presentation',
  templateUrl: './footer-presentation.component.html',
  styleUrls: ['./footer-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterPresentationComponent {
  @Input() menuItems!: Array<Footer>;
  @Input() langItems!: Array<FooterLang>;
  @Input() messengerMenu!: Array<FooterMessenger>;
  @Input() footerCards!: Array<FooterCards>;
  @Input() footerLicenseItems!: Array<FooterCards>;

  constructor(private readonly languageService: LanguageFacade) {}

  changeLanguage(lang: Language) {
    this.languageService.setLanguage(lang);
  }

  openLiveChat(event) {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.LiveCaller.$emit('ui.widget.open');
  }
}
