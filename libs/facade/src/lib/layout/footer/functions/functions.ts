import { Language } from '@crc/shared';
import {
  Category,
  Footer,
  FooterCards,
  FooterLang,
  FooterMessenger
} from '../entity/footer.interface';

export function generateMenuItems(
  menuTitleKey: string,
  categoryName: Array<Category>
): Footer {
  return {
    menuTitleKey,
    categoryName
  };
}

export function generateLangMenu(
  img: string,
  title: string,
  key: Language
): FooterLang {
  return {
    img: img,
    title: title,
    key: key
  };
}

export function generateMessengerMenu(
  link: string,
  img: string
): FooterMessenger {
  return {
    link: link,
    img: img
  };
}

export function generateFooterCards(name: string): FooterCards {
  return {
    name
  };
}
