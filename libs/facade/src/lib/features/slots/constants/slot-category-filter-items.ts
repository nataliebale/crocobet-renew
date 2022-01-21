import { FilterItemView, generateFilterItemViews } from '@crc/components';
import { DEFAULT_SLOT_CATEGORY_FILTER } from './default-slot-category-filter';

export const SLOTS_CATEGORY_FILTER_ITEMS: FilterItemView[] = [
  DEFAULT_SLOT_CATEGORY_FILTER,
  generateFilterItemViews(
    '2',
    'Favorites',
    'assets/icons/filters/favorites.svg',
    13,
    'slot:favorites'
  ),
  generateFilterItemViews(
    '3',
    'New Games',
    'assets/icons/filters/new-games.svg',
    23,
    'web:new_games'
  ),
  generateFilterItemViews(
    '4',
    'Buy Bonus',
    'assets/icons/filters/buy-bonus.svg',
    3,
    'bonus'
  ),
  generateFilterItemViews(
    '5',
    'History',
    'assets/icons/filters/history.svg',
    123,
    'slot:history'
  )
];
