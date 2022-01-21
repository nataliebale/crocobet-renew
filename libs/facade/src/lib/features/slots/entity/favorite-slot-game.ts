import { SlotGame } from './slot-game';

export type FavoriteSlotGame = SlotGame & {
  isFavorite: boolean;
};
