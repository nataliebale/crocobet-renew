import { generateMenuItems } from '../functions/functions';
import { MenuItem } from '../entity/menu-items.interface';

export const MENU_ITEMS: MenuItem[] = [
  generateMenuItems('navbar.sports', 'sport', 'sport', true),
  generateMenuItems('navbar.live', 'live', 'live'),
  generateMenuItems('navbar.slots', 'slots', 'slots'),
  generateMenuItems('navbar.casino', 'casino', 'casino'),
  generateMenuItems('navbar.ufo', 'ufo', 'ufo'),
  generateMenuItems('navbar.poker', 'poker', 'poker'),
  generateMenuItems('navbar.tableGames', 'games', 'games'),
  generateMenuItems('navbar.virtual', 'virtual', 'virtual'),
  generateMenuItems('navbar.promotions', 'promos', 'promotions')
];
