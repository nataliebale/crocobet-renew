export interface CategoryGames<T> {
  category: string;
  games: Array<T>;
  name: string;
  order: number;
  type: string;
}
