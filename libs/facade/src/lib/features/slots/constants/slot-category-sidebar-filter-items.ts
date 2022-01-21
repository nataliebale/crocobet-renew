import { FilterItemView, generateFilterItemViews } from '@crc/components';

import { DEFAULT_SLOT_CATEGORY_FILTER } from './default-slot-category-filter';

export const SLOTS_CATEGORY_SIDEBAR_FILTER_ITEMS: FilterItemView[] = [
  { ...DEFAULT_SLOT_CATEGORY_FILTER, totalCount: undefined },
  generateFilterItemViews(
    '2',
    'Favorites',
    'assets/icons/filters/favorites.svg',
    undefined,
    'slot:favorites'
  ),
  generateFilterItemViews(
    '3',
    'History',
    'assets/icons/filters/history.svg',
    undefined,
    'slot:history'
  )
];
