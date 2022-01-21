export interface PromotionsMenu {
  name: string;
  active?: boolean;
  filter?: string;
}

export const generatePromotionCategories = (
  name: string,
  active?: boolean,
  filter?: string
): PromotionsMenu => ({
  name,
  active,
  filter
});
