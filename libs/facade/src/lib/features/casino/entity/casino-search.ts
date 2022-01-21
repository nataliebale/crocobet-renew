import { Provider } from '../../shared';
import { CasinoGame } from './casino-game';

export interface CasinoGameSearch {
  provider: Provider;
  game: CasinoGame;
}
