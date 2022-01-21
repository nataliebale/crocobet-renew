import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoListContainerComponent } from './casino-list-container.component';

describe('GamesListContainerComponent', () => {
  let spectator: Spectator<CasinoListContainerComponent>;
  const createComponent = createComponentFactory(CasinoListContainerComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
