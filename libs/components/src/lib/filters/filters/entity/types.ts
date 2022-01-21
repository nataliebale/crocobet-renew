export interface FilterItemView {
  _id?: string;
  name: string;
  iconUrl?: string;
  totalCount?: number;
  filter?: string;
  active?: boolean;
  isNew?: boolean;
}

export const generateFilterItemViews = (
  _id: string,
  name: string,
  iconUrl?: string,
  totalCount?: number,
  filter?: string,
  active?: boolean,
  isNew?: boolean
): FilterItemView => ({
  _id,
  name,
  iconUrl,
  totalCount,
  filter,
  active,
  isNew
});
