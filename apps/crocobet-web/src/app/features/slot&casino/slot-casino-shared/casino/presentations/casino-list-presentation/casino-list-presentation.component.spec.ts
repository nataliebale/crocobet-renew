import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CasinoListPresentationComponent } from './casino-list-presentation.component';

describe('GamesPresentationComponent', () => {
  let spectator: Spectator<CasinoListPresentationComponent>;
  const createComponent = createComponentFactory(
    CasinoListPresentationComponent
  );

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
