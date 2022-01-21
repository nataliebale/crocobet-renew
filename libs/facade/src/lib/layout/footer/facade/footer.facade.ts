import { Injectable } from '@angular/core';

import {
  Footer,
  FooterCards,
  FooterLang,
  FooterMessenger
} from '../entity/footer.interface';
import {
  FOOTER_CARDS,
  FOOTER_LICENSE_ITEMS,
  LANG_MENU,
  MENU_ITEMS,
  MESSENGER_MENU
} from '../entity/footer-menu-items';

@Injectable({
  providedIn: 'root'
})
export class FooterFacade {
  private readonly menuItems: Array<Footer> = MENU_ITEMS;
  private readonly langMenu: Array<FooterLang> = LANG_MENU;
  private readonly messengerMenu: Array<FooterMessenger> = MESSENGER_MENU;
  private readonly footerCards: Array<FooterCards> = FOOTER_CARDS;
  private readonly footerLicenseItems: Array<FooterCards> =
    FOOTER_LICENSE_ITEMS;

  getMenuItems(): Array<Footer> {
    return this.menuItems;
  }

  getLangItems(): Array<FooterLang> {
    return this.langMenu;
  }

  getMessengerMenu(): Array<FooterMessenger> {
    return this.messengerMenu;
  }

  getFooterCards(): Array<FooterCards> {
    return this.footerCards;
  }

  getFooterLicenseItems(): Array<FooterCards> {
    return this.footerLicenseItems;
  }
}
