import {
  Footer,
  FooterCards,
  FooterLang,
  FooterMessenger
} from '../entity/footer.interface';
import {
  generateFooterCards,
  generateLangMenu,
  generateMenuItems,
  generateMessengerMenu
} from '../functions/functions';

export const MENU_ITEMS: Array<Footer> = [
  generateMenuItems('footer_general', [
    { nameKey: 'footer_rules_and_terms', link: '/' },
    { nameKey: 'footer_game_rules', link: '/' },
    { nameKey: 'casino_reglament', link: '/' },
    { nameKey: 'footer_restrictedCountries', link: '/' },
    { nameKey: '18+', link: '/' },
    { nameKey: 'F.A.Q.', link: '/' }
  ]),
  generateMenuItems('footer_personal', [
    { nameKey: 'footer_verification', link: '/profile/verification' },
    { nameKey: 'common_changePassword', link: '/profile/personal-info' },
    { nameKey: 'footer_security_options', link: '/' }
  ]),
  generateMenuItems('customer_balance', [
    { nameKey: 'common_deposit_next', link: '/profile/deposit' },
    { nameKey: 'footer_widthrawal', link: '/' },
    { nameKey: 'secret_card', link: '/profile/secret-card' }
  ]),
  generateMenuItems('footer_points', [
    { nameKey: 'footer_crocobets_branches', link: '/profile/cashiers' }
  ]),
  generateMenuItems('footer_contact', [
    { nameKey: '*0707', link: '#' },
    { nameKey: '(032) 2597777', link: '#' }
  ])
];

export const LANG_MENU: Array<FooterLang> = [
  generateLangMenu('ge', 'GE', 'ka'),
  generateLangMenu('en', 'EN', 'en'),
  generateLangMenu('ru', 'RU', 'ru')
];

export const MESSENGER_MENU: Array<FooterMessenger> = [
  generateMessengerMenu('https://www.m.me/crocobet', 'messenger'),
  generateMessengerMenu('viber://pa?chatURI=httpswwwcrocobetcom', 'viber')
];

export const FOOTER_CARDS: Array<FooterCards> = [
  generateFooterCards('bog'),
  generateFooterCards('tbc'),
  generateFooterCards('liberty'),
  generateFooterCards('visa')
];

export const FOOTER_LICENSE_ITEMS: Array<FooterCards> = [
  generateFooterCards('18'),
  generateFooterCards('21')
];
