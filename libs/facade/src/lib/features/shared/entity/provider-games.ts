export type ProviderGames<T> = Provider & {
  games: Array<T>;
};

export interface Provider {
  enabled?: boolean;
  gamesCount?: number;
  iframeH: number;
  iframeW: number;
  name: string;
  order: number;
  provider: string;
  tags?: string[];
  type?: string;
  vendor?: string;
  _id?: string;
}
