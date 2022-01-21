import { generateFilterItemViews } from '@crc/components';

import { SlotFilterTypeItem } from '../entity';

export const DEFAULT_SLOT_CATEGORY_FILTER = generateFilterItemViews(
  '1',
  'Top Slots',
  'assets/icons/filters/top-slots.svg',
  44,
  'web:popular'
);

export const DEFAULT_SLOT_CATEGORY_FILTER_TYPE_ITEM: SlotFilterTypeItem = {
  filter: DEFAULT_SLOT_CATEGORY_FILTER.filter ?? '',
  filterType: 'category'
};
