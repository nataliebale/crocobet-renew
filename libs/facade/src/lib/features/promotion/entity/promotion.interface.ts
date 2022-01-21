export interface PromotionData {
  data: Promotion;
}

export interface Promotion {
  _id?: string; // unix time in seconds title: string;
  desc?: string;
  title?: string;
  startDate?: number; // unix time in seconds
  endDate?: number; // unix time in seconds
  isActive?: boolean;
  __v?: number;
}
