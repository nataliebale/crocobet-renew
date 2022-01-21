export interface CasinoGame {
  enabled: boolean;
  // eslint-disable-next-line camelcase
  game_id: string;
  // eslint-disable-next-line camelcase
  group_name: string;
  image: string;
  limits: {
    min: number;
    max: number;
  };
  name: string;
  order: number;
  provider: string;
  tags: string[];
  url: string;
  _id: string;
}
