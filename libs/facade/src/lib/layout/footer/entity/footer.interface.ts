import { Language } from '@crc/shared';

export interface Footer {
  menuTitleKey: string;
  categoryName: Array<Category>;
}

export interface Category {
  nameKey: string;
  link?: string;
}

export interface FooterLang {
  img: string;
  title: string;
  active?: boolean;
  key: Language;
}

export interface FooterMessenger {
  link: string;
  img: string;
}

export interface FooterCards {
  name: string;
}
